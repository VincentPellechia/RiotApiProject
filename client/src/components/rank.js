import React, { useEffect, useState } from 'react';

const Rank = ({ summonerId, region }) => {
    
    const [rankData, setRankData] = useState(null);

    useEffect(() => {
        const fetchRank = async () => {
            try {
              const response = await fetch(`http://localhost:8000/getRank`, {
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
              setRankData(soloRankData);
            }
            catch(error){
                console.error('Error fetching rank data:', error);
            }
        }
        fetchRank();

    },[region,summonerId])

    if (!rankData) {
        return <p>Loading rank data...</p>;
      }


  return (
    <div>
      <p>Solo Rank: {rankData.tier} {rankData.rank} {rankData.leaguePoints} LP</p>
      <p>Wins: {rankData.wins}</p>
      <p>Losses: {rankData.losses}</p>
      <p>Hot Streak: {rankData.hotStreak ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Rank;