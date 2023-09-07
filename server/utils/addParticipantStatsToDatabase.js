const addParticipantStatsToDatabase = async (
  client,
  participantId,
  statsData
) => {
  try {
    const roleLaneMapping = {
      MID_LANE: {
        SOLO: "MIDDLE",
      },
      TOP_LANE: {
        SOLO: "TOP",
      },
      JUNGLE: {
        NONE: "JUNGLE",
      },
      BOT_LANE: {
        DUO_CARRY: "BOTTOM",
        DUO_SUPPORT: "UTILITY",
      },
    };

    const role = roleLaneMapping[statsData.role]?.[statsData.lane] || "UNKNOWN";
    // SQL query to insert participant stats data into participant_stats table
    const queryText = `INSERT INTO participant_stats (participant_id, champion_name,win,kills,assists,deaths,role,damage_dealt,damage_taken,gold_earned,champion_level,
        item0,item1,item2,item3,item4,item5,item6,total_minions_killed,summoner1_id,summoner2_id,largest_multi_kill) 
                        VALUES ($1, $2,$3, $4,$5, $6,$7, $8,$9, $10,$11, $12,$13, $14,$15, $16,$17, $18,$19, $20,$21, $22)`; // Replace 'participant_stats' with your actual table name and add other columns and values

    // Data to be inserted for participant stats

    const values = [
      participantId,
      statsData.championName,
      statsData.win,
      statsData.kills,
      statsData.assists,
      statsData.deaths,
      role,
      statsData.damageDealt,
      statsData.damageTaken,
      statsData.goldEarned,
      statsData.championLevel,
      statsData.item0,
      statsData.item1,
      statsData.item2,
      statsData.item3,
      statsData.item4,
      statsData.item5,
      statsData.item6,
      statsData.totalMinionsKilled,
      statsData.summoner1Id,
      statsData.summoner2Id,
      statsData.largestMultiKill,
    ];

    //Execute the insert query for participant stats
    await client.query(queryText, values);
  } catch (error) {
    console.error("Error adding participant stats to the database:", error);
    throw error;
  }
};

module.exports = addParticipantStatsToDatabase;
