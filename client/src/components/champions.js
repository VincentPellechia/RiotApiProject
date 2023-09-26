import React, { useState, useEffect } from "react";
import img from "../assets/temp.png";
import * as userService from "../services/user.js"; // Import the userService
import { formatAverage, getAverage } from "../utils/helpers.js";
import "../styling/champions.css";

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
    <React.Fragment>
      {loadingChampions ? (
        <p>Loading Champions...</p>
      ) : (
        <ul className="champions-list">
          {championData.map((champion) => (
            <li key={champion.champion_id} className="champions-item">
              <div>
                <img
                  src={img}
                  alt={`Champion ${champion.champion_name}`}
                  width="30"
                  height="30"
                  className="champions-image"
                />
              </div>
              <div className="champions-details">
                <div className="champion-name">{champion.champion_name}</div>
                <div className="champion-games">
                  <p>{getAverage(champion.wins, champion.losses)}%</p>
                  <p>Wins: {champion.wins}</p>
                  <p>Loses: {champion.losses}</p>
                </div>
                <div className="champion-kda">
                  <p>
                    {formatAverage(champion.average_kills) +
                      "/" +
                      formatAverage(champion.average_deaths) +
                      "/" +
                      formatAverage(champion.average_assists)}
                  </p>
                  <p>CS {formatAverage(champion.creep_score)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Champions;
