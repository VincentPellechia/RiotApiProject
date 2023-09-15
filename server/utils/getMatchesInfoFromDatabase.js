const { pool } = require("../db");

const getMatchesInfoFromDatabase = async (matchId, region) => {
  region = region.toUpperCase();

  const result = await pool.query(
    `
        SELECT *
        FROM matches
        INNER JOIN participants ON participants.match_id = matches.match_id
        INNER JOIN participant_stats ON participants.participant_id = participant_stats.participant_id
        where matches.match_id = $1
        and matches.match_region = $2
        `,
    [matchId.match_id, region] // Use parameterized query to prevent SQL injection
  );
  return result.rows;
};

module.exports = getMatchesInfoFromDatabase;
