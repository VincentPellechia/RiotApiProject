import React, { useEffect, useState } from "react";
import * as userService from "../services/user.js";
import img from "../assets/temp.png";
import "../styling/rank.css";
import { getAverage } from "../utils/helpers.js";

const Rank = ({ summonerId, region }) => {
  const [rankData, setRankData] = useState(null);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const rankData = await userService.fetchRank(region, summonerId);
        setRankData(rankData);
      } catch (error) {
        console.error("Error fetching rank data:", error);
      }
    };
    fetchRank();
  }, [region, summonerId]);

  if (!rankData) {
    return <p>Loading rank data...</p>;
  }

  return (
    <div className="rank-container">
      <div>
        <img
          src={img}
          alt={`Champion ${rankData.tier}`}
          width="100"
          height="100"
          className="rank-image"
        />
      </div>
      <div className="rank-data">
        <p>
          Solo Rank: {rankData.tier} {rankData.rank} {rankData.leaguePoints} LP
        </p>
        <p>
          {rankData.wins}W {rankData.losses}L
        </p>
        <p>{getAverage(rankData.wins, rankData.losses)}%</p>
        <p>Hot Streak: {rankData.hotStreak ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default Rank;
