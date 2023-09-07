const getMostRecentMatches = require("../utils/getMostRecentMatches"); // Import your utility functions
const getMatchData = require("../utils/getMatchData");
const addMatchesToDatabase = require("../utils/addMatchesToDatabase");
const addParticipantsToDatabase = require("../utils/addParticipantsToDatabase");

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
const getMatchesFromDatabase = async (summonerName) => {
  try {
    const result = await pool.query(
      `
        SELECT matches.match_id
        FROM matches
        INNER JOIN participants ON participants.match_id = matches.match_id
        INNER JOIN participant_stats ON participants.participant_id = participant_stats.participant_id
        WHERE participants.summoner_name = $1
        `,
      [summonerName] // Use parameterized query to prevent SQL injection
    );
    return result.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  }
};

//TODO
const getMatchesInfoFromDatabase = async (matchId) => {
  try {
    const result = await pool.query(
      `
        SELECT *
        FROM participant_stats
        INNER JOIN participants ON participants.participants_id = participant_stats.participant_id
        WHERE participants.match_id = $1
        `,
      [matchId] // Use parameterized query to prevent SQL injection
    );
    return result.rows;
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
