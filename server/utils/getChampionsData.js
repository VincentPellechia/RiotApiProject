const { pool } = require("../db");

const getChampionsData = async (userId, region) => {
  region = region.toUpperCase();
  const matchType = "CLASSIC";

  const result = await pool.query(
    `
    SELECT
        p.champion_id,
        ps.champion_name,
        SUM(CASE WHEN ps.win = true THEN 1 ELSE 0 END) AS wins,
        SUM(CASE WHEN ps.win = false THEN 1 ELSE 0 END) AS losses,
        AVG(ps.kills) AS average_kills,
        AVG(ps.deaths) AS average_deaths,
        AVG(ps.assists) AS average_assists,
        AVG(ps.total_minions_killed) AS creep_score
    FROM
            participant_stats ps
    JOIN
            participants p ON ps.participant_id = p.participant_id
    JOIN    
            matches m ON P.match_id = m.match_id
    WHERE   P.puuid = $1
    AND     m.match_region = $2
    AND     m.match_mode = $3
    GROUP BY
            p.champion_id, ps.champion_name
    ORDER BY
        wins DESC
        `,
    [userId, region, matchType] // Use parameterized query to prevent SQL injection
  );

  return result.rows;
};

module.exports = getChampionsData;
