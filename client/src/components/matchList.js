import React from 'react';
import Match from './match.js';

const MatchList = ({ userId, matches }) => {
    if(matches < 0){
        return (<div>Loading ...</div>)
    }
  return (
    <div className="match-list">
      {matches.map((match, index) => (
        match ? (<Match key={index} userId = {userId} match={match} />
        ) : null))
        }
    </div>
  );
};

export default MatchList;