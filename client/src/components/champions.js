import React, { useState, useEffect } from "react";
import img from "../assets/temp.png";
import * as userService from "../services/user.js"; // Import the userService
import { formatAverage } from "../utils/helpers.js";

const Champions = ({ user, region }) => {
  const [championData, setChampionData] = useState([]);
  const [loadingChampions, setLoadingChampions] = useState(true);

  useEffect(() => {
    console.log("Champions component rendered");
    const fetchChampions = async () => {
      try {
        // Fetch champion data using the userService
        const champions = await userService.fetchChampionData(
          region,
          user.puuid
        );

        // Set the champion data in the component state
        if (champions) {
          setChampionData(champions);
          setLoadingChampions(false);
        }
      } catch (error) {
        console.error("Error fetching champion data:", error);
        setLoadingChampions(false);
      }
    };

    fetchChampions();
  }, [region, user]);

  return (
    <div className="champions">
      {loadingChampions ? (
        <p>Loading Champions...</p>
      ) : (
        <ul>
          {championData.map((champion) => (
            <li key={champion.champion_id}>
              <div>
                <img
                  src={img}
                  alt={`Champion ${champion.champion_name}`}
                  width="30"
                  height="30"
                />
              </div>
              <div>
                <p>Champion: {champion.champion_name}</p>
                <p>Wins: {champion.wins}</p>
                <p>Loses: {champion.losses}</p>
                <p>Kills: {formatAverage(champion.average_kills)}</p>
                <p>Deaths: {formatAverage(champion.average_deaths)}</p>
                <p>Assists: {formatAverage(champion.average_assists)}</p>
                <p>Creep Score: {formatAverage(champion.creep_score)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Champions;
