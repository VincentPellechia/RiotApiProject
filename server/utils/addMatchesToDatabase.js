const { pool } = require("../db");

// Assuming that matchesData is an array of matches fetched from the Riot Games API
const addMatchesToDatabase = async (matchesData) => {
  let client; // Declare the client outside the try-catch block
  let newMatchArr = [];

  try {
    client = await pool.connect(); // Acquire a connection from the pool

    // Start a transaction
    await client.query("BEGIN");

    for (const match of matchesData) {
      const timestamp = Math.floor(match.info.gameCreation / 1000);
      const postgresTimestamp = new Date(timestamp * 1000).toISOString();

      const queryText = `
        INSERT INTO matches (match_id, match_date, match_duration, match_mode, match_type, match_region)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (match_id) DO NOTHING
        returning match_id;
      `;

      const values = [
        match.metadata.matchId,
        postgresTimestamp,
        match.info.gameDuration,
        match.info.gameMode,
        match.info.gameType,
        match.info.platformId,
      ];

      // Execute the insert query for each match
      const res = await client.query(queryText, values);

      if (res.rows[0]?.match_id) newMatchArr.push(res.rows[0]?.match_id);
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
      return newMatchArr;
    }
  }
};

module.exports = addMatchesToDatabase;
