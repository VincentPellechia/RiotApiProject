import React, { useState } from 'react';
import Participants from './participants.js';

const Match = ({ userId, match }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
    setExpanded(!expanded);
  };

    if (!match) {
        // If match is not available, render a loading state or a placeholder
        return <div>Loading Match...</div>;
    }

    const playerIndex = match.metadata.participants.indexOf(userId);
    const player = playerIndex !== -1 ? match.info.participants[playerIndex] : null;

  return (
    player && (
    <div
      key={match.info.matchId}
      style={{ backgroundColor: player?.win ? 'green' : 'red' }}
      className="match"
      onClick={toggleExpanded}
    >
      <div className="match-summary">
        <h4>Game Mode: {match.metadata.gameMode}</h4>
        <h4>{player.kills}/{player.deaths}/{player.assists}</h4>
        <h4>Duration: {Math.floor(match.info.gameDuration/60) +" minutes " + (match.info.gameDuration - (Math.floor( match.info.gameDuration/ 60))*60) +" seconds"}</h4>
        {player && <h4>Champion: {player.championName}</h4>}
        {/* Display other basic match information */}
      </div>
      {expanded && (
        <div className="match-details">
            <React.Fragment>
              <h4>
                Damage dealt: {player.magicDamageDealtToChampions + player.physicalDamageDealtToChampions}
              </h4>
              <Participants participants={match.info.participants} />
              {/* Display additional match details */}
            </React.Fragment>
        </div>
      )}
    </div>
    )
  );
};

export default Match;