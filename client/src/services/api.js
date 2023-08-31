export const getUser = async (region, userName) => {
    try {
        const response = await fetch(`http://localhost:8000/getUser`, {
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
    try{
          const matchesResponse = await fetch(`http://localhost:8000/getMatches`, {
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
  
export const getMatchInfo = async (region, matches) => {
    try {
        if (matches.length > 0) {
          const matchInfoData = await Promise.all(
            matches.map(async (match) => {
              const matchResponse = await fetch(`http://localhost:8000/getMatchInfo`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ region, match }),
              });

              if (!matchResponse.ok) {
                throw new Error(`Failed to fetch match info for matchId: ${match}`);
              }

              const matchInfo = await matchResponse.json();
              return matchInfo.message;
            })
          );
        }
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
};