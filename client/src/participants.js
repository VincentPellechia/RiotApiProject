import React from 'react';
import { Link, useParams } from "react-router-dom";

const Participants = ({ participants }) => {

    const { region } = useParams();
  
    const middleIndex = Math.floor(participants.length /2);
  
    let team1 = participants.slice(0, middleIndex).map((player) => (
    <li key={player.summonerId}>
        <Link to={"/user/"+region+"/"+player.summonerName}>{player.summonerName}</Link>
    </li>
    ));
    
    let team2 = participants.slice(middleIndex).map((player) => (
    <li key={player.summonerId}>
        <Link to={"/user/"+region+"/"+player.summonerName}>{player.summonerName}</Link>
    </li>
    ));

    return (
    <div className="participants">
        <div className='team1'>
            <ul>
            {team1}
            </ul>
        </div>
        <div className='team2'>
            <ul>
            {team2}
            </ul>
        </div>
    </div>
  );
};

export default Participants;