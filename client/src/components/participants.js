import React from "react";
import { useParams } from "react-router-dom";

const Participants = ({ match }) => {
  const { region } = useParams();

  const redirectToUserPage = (summonerName) => {
    const userPageURL = `/user/${region}/${summonerName}`;
    window.location.href = userPageURL;
  };

  const team1 = match
    .filter((x) => x.team_id === 100)
    .map((player) => (
      <li key={player.participant_id}>
        <span
          onClick={() => redirectToUserPage(player.summoner_name)}
          style={{ cursor: "pointer" }}
        >
          {player.summoner_name}
          {player.champion_name}
        </span>
      </li>
    ));

  const team2 = match
    .filter((x) => x.team_id === 200)
    .map((player) => (
      <li key={player.participant_id}>
        <span
          onClick={() => redirectToUserPage(player.summoner_name)}
          style={{ cursor: "pointer" }}
        >
          {player.summoner_name}
        </span>
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
