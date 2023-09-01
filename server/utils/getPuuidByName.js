const API_KEY = process.env.RIOTAPI;

async function getPuuidByName(name, region){
    try {
      const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      });
  
      if (!response.ok) {
        throw new Error(`a Request failed with status ${response.status}`);
      }
  
      const res = await response.json();
      return res;
      }
      catch (error) {
        console.error('Error retrieving Puuid:', error);
      }
  }

module.exports = getPuuidByName;