const API_KEY = process.env.RIOTAPI;

async function getRankBySummonerId(summonerId, region){
  try {
    const response = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
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
      console.error('Error retrieving Rank Info:', error);
    }
}

module.exports = getRankBySummonerId;