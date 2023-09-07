const { pool } = require("../db");
const addParticipantStatsToDatabase = require("../utils/addParticipantStatsToDatabase");

const addParticipantsToDatabase = async (matchesData) => {
  let client; // Declare the client outside the try-catch block

  try {
    client = await pool.connect(); // Acquire a connection from the pool
    // Start a transaction
    await client.query("BEGIN");

    for (const match of matchesData) {
      const matchId = match.metadata.matchId;
      for (const participant of match.info.participants) {
        // Destructure participant data

        const {
          summonerName,
          puuid,
          teamId,
          championId,
          championName,
          // Add other relevant participant data here
        } = participant;

        // SQL query to insert participant data into participants table
        const queryText = `INSERT INTO participants (match_id, puuid, summoner_name, champion_name, champion_id, team_id) 
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING participant_id`; // Return the participant_id

        // Data to be inserted for participants
        const values = [
          matchId,
          puuid,
          summonerName,
          championName,
          championId,
          teamId,
        ];

        // Execute the insert query for each match
        const result = await client.query(queryText, values);

        // Get the returned participant_id
        const participantId = result.rows[0].participant_id;

        const statsData = {
          championName: championName,
          win: participant.win,
          kills: participant.kills,
          assists: participant.assists,
          deaths: participant.deaths,
          role: participant.role,
          lane: participant.lane,
          damageDealt: participant.totalDamageDealtToChampions,
          damageTaken: participant.totalDamageTaken,
          goldEarned: participant.goldEarned,
          championLevel: participant.champLevel,
          item0: participant.item0,
          item1: participant.item1,
          item2: participant.item2,
          item3: participant.item3,
          item4: participant.item4,
          item5: participant.item5,
          item6: participant.item6,
          totalMinionsKilled: participant.totalMinionsKilled,
          summoner1Id: participant.summoner1Id,
          summoner2Id: participant.summoner2Id,
          largestMultiKill: participant.largestMultiKill,
        };

        // Pass participantId to addParticipantStatsToDatabase along with relevant stats data
        await addParticipantStatsToDatabase(client, participantId, statsData);
      }
    }
    // Commit the transaction
    await client.query("COMMIT");
  } catch (error) {
    // If there's an error, rollback the transaction
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error adding matches to the database:", error);
    throw error;
  } finally {
    if (client) {
      client.release(); // Release the connection back to the pool
    }
  }
};

module.exports = addParticipantsToDatabase;
