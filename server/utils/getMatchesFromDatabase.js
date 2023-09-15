const { pool } = require("../db");

const getMatchesFromDatabase = async (userId, region) => {
  region = region.toUpperCase();

  const result = await pool.query(
    `
        SELECT matches.match_id
        FROM matches
        INNER JOIN participants ON participants.match_id = matches.match_id
        INNER JOIN participant_stats ON participants.participant_id = participant_stats.participant_id
        where participants.puuid = $1
        and matches.match_region = $2
        `,
    [userId, region] // Use parameterized query to prevent SQL injection
  );

  return result.rows;
};

module.exports = getMatchesFromDatabase;
