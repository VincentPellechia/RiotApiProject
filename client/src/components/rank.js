import React, { useEffect, useState } from 'react';
import * as userService from '../services/user.js';

const Rank = ({ summonerId, region }) => {
    
    const [rankData, setRankData] = useState(null);

    useEffect(() => {
        const fetchRank = async () => {
            try {
              const rankData = await userService.fetchRank(region, summonerId);
              setRankData(rankData);
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