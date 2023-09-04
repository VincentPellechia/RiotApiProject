const getMostRecentMatches = require('../utils/getMostRecentMatches'); // Import your utility functions
const getMatchData = require('../utils/getMatchData');
const addMatchesToDatabase = require('../utils/addMatchesToDatabase');

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
      res.json({ message: matchDataArray });
    }
    catch(error){
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

// Define other match controllers here

module.exports = {
  getMatches,
  getMatchInfo,
  // Export other match controllers here
};