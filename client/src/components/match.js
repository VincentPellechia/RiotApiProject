import React, { useState } from "react";
import Participants from "./participants.js";
import { formatMatchDuration, getBackgroundColor } from "../utils/helpers.js";

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

  return (
    matchInfo && (
      <div
        key={matchInfo.matchId}
        style={{ backgroundColor: backgroundColor }}
        className="match"
        onClick={toggleExpanded}
      >
        <div className="match-summary">
          <h4>Game Mode: {matchInfo.match_mode}</h4>
          <h4>
            {matchInfo.kills}/{matchInfo.deaths}/{matchInfo.assists}
          </h4>
          <h4>Duration: {formattedDuration}</h4>
          {matchInfo && <h4>Champion: {matchInfo.champion_name}</h4>}
          {/* Display other basic match Information */}
        </div>
        {expanded && (
          <div className="match-details">
            <React.Fragment>
              <h4>Damage dealt: {matchInfo.damage_dealt}</h4>
              <Participants match={match} />
              {/* Display additional match details */}
            </React.Fragment>
          </div>
        )}
      </div>
    )
  );
};

export default Match;
