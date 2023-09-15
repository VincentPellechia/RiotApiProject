const API_KEY = process.env.RIOTAPI;

async function getMatchData(matchId, region) {
  try {
    const response = await fetch(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Request for match data failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving match data:", error);
    return null;
  }
}

module.exports = getMatchData;
