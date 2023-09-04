export const getUser = async (region, userName) => {
    try {
      const response = await fetch(`http://localhost:8000/user/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region, userName }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  export const getMatches = async (region, userId) => {
    try {
      const matchesResponse = await fetch(`http://localhost:8000/match/getMatches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region, userId }),
      });
  
      if (!matchesResponse.ok) {
        throw new Error('Failed to fetch user matches');
      }
  
      const matchesData = await matchesResponse.json();
      return matchesData;
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };
  
  export const getMatchesInfo = async (region, matches) => {
    try {
      const matchResponse = await fetch(`http://localhost:8000/match/getMatchInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region, matches }),
      });
  
      if (!matchResponse.ok) {
        throw new Error(`Failed to fetch match info for matchId: ${matches}`);
      }
  
      const matchInfo = await matchResponse.json();
      return matchInfo.message;
    } catch (error) {
      console.error('Error fetching match info:', error);
    }
  };

  export const fetchRank = async (region, summonerId) => {
    try {
        const response = await fetch(`http://localhost:8000/user/getRank`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({ region, summonerId }), // Use destructuring here
       });
 
       if (!response.ok) {
        throw new Error('Failed to fetch user');
       }
 
       const data = await response.json();
       const soloRankData = data.rankInfo.find((rank) => rank.queueType === 'RANKED_SOLO_5x5');
       return soloRankData;
    } catch(error){
        console.error('Error fetching rank data:', error);
    }
};