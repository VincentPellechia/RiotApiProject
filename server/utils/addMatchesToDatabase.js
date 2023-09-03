const MatchModel = require('../models/match'); // Replace with your actual Match model
const pool = require('../db');

// Assuming that matchesData is an array of matches fetched from the Riot Games API
const addMatchesToDatabase = async (matchesData) => {
    try {
      await pool.connect();
  
      for (const match of matchesData) {
        const queryText = 'INSERT INTO matches (matchId, column1, column2) VALUES ($1, $2, $3) ON CONFLICT (matchId) DO NOTHING';
        // Replace 'matches' with your actual table name and 'column1', 'column2' with your column names
  
        const values = [match.matchId, match.column1Value, match.column2Value];
        // Replace with the actual values you want to insert
  
        await pool.query(queryText, values);
      }
    } catch (error) {
      console.error('Error adding matches to the database:', error);
      throw error;
    } finally {
      pool.end(); // Close the connection when done
    }
  };
  
  module.exports = addMatchesToDatabase;