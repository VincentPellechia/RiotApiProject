import React from "react";

const Participant = ({ player, region }) => {
  console.log(player);
  const redirectToUserPage = () => {
    const userPageURL = `/user/${region}/${player.summoner_name}`;
    window.location.href = userPageURL;
  };

  return (
    <li>
      <span onClick={redirectToUserPage} style={{ cursor: "pointer" }}>
        {player.summoner_name}
      </span>
      <div>
        <p>{player.champion_name}</p>
        <p>
          {player.kills} / {player.deaths} / {player.assists}
        </p>
        <p>Damage: {player.damage_dealt}</p>
        <p>Damage Taken: {player.damage_taken}</p>
        <p>Creep Score: {player.total_minions_killed}</p>
        {/* Add more stats here */}
      </div>
    </li>
  );
};

export default Participant;
