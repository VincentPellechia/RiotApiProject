const getMostRecentMatches = require('../utils/getMostRecentMatches'); // Import your utility functions
const getMatchData = require('../utils/getMatchData');

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
  
        const matchId = req.body.match;
        const matchData = await getMatchData(matchId, region);
        //await addMatchToDatabase(matchData);
        res.json({message: matchData});
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