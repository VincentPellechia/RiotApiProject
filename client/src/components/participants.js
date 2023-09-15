import React from "react";
import { Link, useParams } from "react-router-dom";

const Participants = ({ match }) => {
  const { region } = useParams();

  let team1 = match
    .filter((x) => x.team_id === 100)
    .map((player) => (
      <li key={player.participant_id}>
        <Link to={"/user/" + region + "/" + player.summoner_name}>
          {player.summoner_name}
        </Link>
      </li>
    ));

  let team2 = match
    .filter((x) => x.team_id === 200)
    .map((player) => (
      <li key={player.participant_id}>
        <Link to={"/user/" + region + "/" + player.summoner_name}>
          {player.summoner_name}
        </Link>
      </li>
    ));

  return (
    <div className="participants">
      <div className="team1">
        <ul>{team1}</ul>
      </div>
      <div className="team2">
        <ul>{team2}</ul>
      </div>
    </div>
  );
};

export default Participants;
