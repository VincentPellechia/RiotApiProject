const API_KEY = process.env.RIOTAPI;

async function getMostRecentMatches(puuid, region){
    try {
      const response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      });
  
      if (!response.ok) {
        throw new Error(`The Request failed with status ${response.status}`);
      }
  
      const res = await response.json();
      return res;
      }
      catch (error) {
        console.error('Error retrieving champion ID:', error);
      }
  }

module.exports = getMostRecentMatches;