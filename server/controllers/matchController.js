const getMostRecentMatches = require('../utils/getMostRecentMatches'); // Import your utility functions
const getMatchData = require('../utils/getMatchData');
const addMatchesToDatabase = require('../utils/addMatchesToDatabase');

//TODO rename getMatches and getMatchInfo to getMatchesFromAPI and getMatchInfoFromAPI respectfully

const getMatches = async (req, res) => {
  try {
    let region;
    if(req.body.region === 'euw1' || req.body.region === 'eun1') {region = 'EUROPE';}

    if(req.body.region === 'na1'){region = 'AMERICAS';}
    const puuid = req.body.userId;

    const recentGames = await getMostRecentMatches(puuid, region);

    res.json({ message: recentGames });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getMatchInfo = async (req, res) => {
    try{
        let region;
        if(req.body.region === 'euw1' || req.body.region === 'eun1') {region = 'EUROPE';}
    
        if(req.body.region === 'na1'){region = 'AMERICAS';}
  
        const matchIds = req.body.matches;
        const matchDataArray = [];

      // Loop through each match ID and fetch match data
      for (const matchId of matchIds) {
        const matchData = await getMatchData(matchId, region);
        matchDataArray.push(matchData);
      }

      await addMatchesToDatabase(matchDataArray);
      //await addParticipantsToDatabase(matchDataArray); todo
      //await addParticipantStatsToDatabase(matchDataArray); todo
      res.json({ message: matchDataArray });
    }
    catch(error){
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

//TODO
const getMatchesFromDatabase = async (req,res) =>{
  try{
    pool.query(`
    SELECT * from matches left join participants on participants.match_id = match.match_id
    where participants.summoner_name = ${summonerName}
    `, (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Query result:', result.rows);
    });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

//TODO
const getMatchInfoFromDatabase = async (req,res) =>{
  try{
    pool.query(`
    SELECT * from participant_stats left join participants on participants.participant_id = participant_stats.participant_id
    where participants.match_id = ${matchId}
    `, (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Query result:', result.rows);
    });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Define other match controllers here

module.exports = {
  getMatches,
  getMatchInfo,
  // Export other match controllers here
};