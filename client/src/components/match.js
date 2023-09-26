import React, { useState } from "react";
import Participants from "./participants.js";
import {
  formatMatchDuration,
  getBackgroundColor,
  formatGameType,
  formatMatchDate,
  formatAverage,
  getLightBackgroundColor,
} from "../utils/helpers.js";
import "../styling/match.css";

const Match = ({ userId, match }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!match) {
    // If match is not available, render a loading state or a placeholder
    return <div>Loading Match...</div>;
  }
  //This is the matchInfo
  const matchInfo = match.find((info) => info.puuid === userId);
  const formattedDuration = formatMatchDuration(matchInfo.match_duration);
  const backgroundColor = getBackgroundColor(matchInfo.win);
  const lightBackgroundColor = getLightBackgroundColor(matchInfo.win);

  return (
    matchInfo && (
      <div
        key={matchInfo.matchId}
        style={{ backgroundColor: backgroundColor }}
        className="match"
        onClick={toggleExpanded}
      >
        <div className="match-summary">
          <div className="match-info">
            <p>{formatGameType(matchInfo.match_mode)}</p>
            <p>{formattedDuration}</p>
            <p>{formatMatchDate(matchInfo.match_date)}</p>
          </div>
          <div className="match-details">
            <p>{matchInfo.champion_name}</p>
            <p>
              {matchInfo.kills}/{matchInfo.deaths}/{matchInfo.assists}
            </p>
            <p>
              {formatAverage(
                (matchInfo.kills + matchInfo.assists) / matchInfo.assists
              )}{" "}
              KDA
            </p>
            <p>{matchInfo.total_minions_killed} CS</p>
            <p>Damage Dealt: {matchInfo.damage_dealt}</p>
            <p>Damage Taken: {matchInfo.damage_taken}</p>
            {/* Display additional match details */}
          </div>

          {/* Display other basic match Information */}
        </div>
        {expanded && (
          <div
            className="match-expanded"
            style={{ backgroundColor: lightBackgroundColor }}
          >
            <div className="match-detailssss">
              <p>
                Placeholder for more info here potentially***{" "}
                {matchInfo.damage_dealt}
              </p>
              {/* Display additional match details */}
            </div>
            <Participants match={match} />
          </div>
        )}
      </div>
    )
  );
};

export default Match;
