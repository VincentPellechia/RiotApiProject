import React from "react";
import { useParams } from "react-router-dom";
import Participant from "./participant"; // Import the new Participant component

const Participants = ({ match }) => {
  const { region } = useParams();

  return (
    <div className="participants">
      <div className="team1">
        <ul>
          {match
            .filter((x) => x.team_id === 100)
            .map((player) => (
              <Participant
                key={player.participant_id}
                player={player} // Pass the entire player object
                region={region}
              />
            ))}
        </ul>
      </div>
      <div className="team2">
        <ul>
          {match
            .filter((x) => x.team_id === 200)
            .map((player) => (
              <Participant
                key={player.participant_id}
                player={player} // Pass the entire player object
                region={region}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Participants;
