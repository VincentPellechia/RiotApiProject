const { pool } = require('../db');

// Assuming that matchesData is an array of matches fetched from the Riot Games API
const addMatchesToDatabase = async (matchesData) => {
  let client; // Declare the client outside the try-catch block

  try {
    client = await pool.connect(); // Acquire a connection from the pool
    
    // Start a transaction
    await client.query('BEGIN');

    for (const match of matchesData) {
      console.log('Adding match to the database:', match.metadata.matchId);
      const timestamp = Math.floor(match.info.gameCreation / 1000);
      const postgresTimestamp = new Date(timestamp * 1000).toISOString();

      const queryText = `
        INSERT INTO matches (match_id, match_date, match_duration, match_mode, match_type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (match_id) DO NOTHING
      `;

      const values = [
        match.metadata.matchId,
        postgresTimestamp,
        match.info.gameDuration,
        match.info.gameMode,
        match.info.gameType,
      ];

      // Execute the insert query for each match
      await client.query(queryText, values);
      console.log('Match added:', match.metadata.matchId);
    }

    // Commit the transaction
    await client.query('COMMIT');
  } catch (error) {
    // If there's an error, rollback the transaction
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Error adding matches to the database:', error);
    throw error;
  } finally {
    if (client) {
      client.release(); // Release the connection back to the pool
    }
  }
};

module.exports = addMatchesToDatabase;