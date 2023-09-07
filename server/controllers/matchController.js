const getMostRecentMatches = require("../utils/getMostRecentMatches"); // Import your utility functions
const getMatchData = require("../utils/getMatchData");
const addMatchesToDatabase = require("../utils/addMatchesToDatabase");
const addParticipantsToDatabase = require("../utils/addParticipantsToDatabase");
const getMatchesFromDatabaseUtil = require("../utils/getMatchesFromDatabase");

//TODO rename getMatches and getMatchInfo to getMatchesFromAPI and getMatchInfoFromAPI respectfully

const getMatchesFromAPI = async (req, res) => {
  try {
    let region;
    if (req.body.region === "euw1" || req.body.region === "eun1") {
      region = "EUROPE";
    }

    if (req.body.region === "na1") {
      region = "AMERICAS";
    }
    const puuid = req.body.userId;

    const recentGames = await getMostRecentMatches(puuid, region);

    res.json({ message: recentGames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getMatchesInfoFromAPI = async (req, res) => {
  try {
    let region;
    if (req.body.region === "euw1" || req.body.region === "eun1") {
      region = "EUROPE";
    }

    if (req.body.region === "na1") {
      region = "AMERICAS";
    }

    const matchIds = req.body.matches;
    const matchDataArray = [];

    // Loop through each match ID and fetch match data
    for (const matchId of matchIds) {
      const matchData = await getMatchData(matchId, region);
      matchDataArray.push(matchData);
    }

    await addMatchesToDatabase(matchDataArray);
    await addParticipantsToDatabase(matchDataArray);

    res.json({ message: matchDataArray });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//TODO
const getMatchesFromDatabase = async (req, res) => {
  try {
    const userId = req.body.userId;
    const region = req.body.region;

    const recentGames = await getMatchesFromDatabaseUtil(userId, region);

    res.json({ message: recentGames });
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  }
};

//TODO
const getMatchesInfoFromDatabase = async (matchId) => {
  try {
    const matchIds = req.body.matches;
    const matchDataArray = [];

    // Loop through each match ID and fetch match data
    for (const matchId of matchIds) {
      const matchData = await getMatchDataFromDatabase(matchId, region);
      matchDataArray.push(matchData);
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  }
};

// Define other match controllers here

module.exports = {
  getMatchesFromAPI,
  getMatchesInfoFromAPI,
  getMatchesFromDatabase,
  getMatchesInfoFromDatabase,
  // Export other match controllers here
};
