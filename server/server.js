// const express = require("express");
// const cors = require("cors");
// const app = express();
// require('dotenv').config();

// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.RIOTAPI;
// let REGION = 'na1'; // e.g., na1, euw1, etc.
// let REGION2 = 'AMERICAS';

// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });


// //League of Legends API in use

// app.post('/getUser', async (req, res) => {
//   try {
//     REGION = req.body.region;
//     const name = req.body.userName;
//     const puuid = await getPuuidByName(name)

//     res.json({ user: puuid });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.post('/getRank', async (req, res) => {
//   try {
//     REGION = req.body.region;
//     const summonerId = req.body.summonerId;
//     const rankInfo = await getRankBySummonerId(summonerId);

//     res.json({ rankInfo: rankInfo });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.post('/getMatches', async (req, res) => {
//   try {
//     if(req.body.region === "euw1" || req.body.region === "eun1"){
//       REGION2 = "EUROPE";
//     }
//     const puuid = req.body.userId;

//     const recentGames = await getMostRecentGames(puuid);

//     res.json({ message: recentGames });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.post('/getMatchInfo', async (req, res) => {
//   try{
//     if(req.body.region === "euw1" || req.body.region === "eun1"){
//       REGION2 = "EUROPE";
//     }

//     const matchId = req.body.match;
//     const matchData = await getMatchData(matchId);
//     //await addMatchToDatabase(matchData);
//     res.json({message: matchData});
//   }
//     catch(error){
//       console.error('Error:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   }
// )

// app.post('/saveMatchData', async (req, res) => {
//     const match = req.body.match;
//     await addMatchToDatabase(match)
//     .then(() => {
//       res.status(201).json({ message: 'Match added successfully' });
//     })
//     .catch((error) => {
//       console.error('Error adding match to database:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// async function getMatchData(matchId){
//   try{
//     const response = await fetch(`https://${REGION2}.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
//       headers: {
//         'X-Riot-Token': API_KEY
//       }
//     });
//     if (!response.ok) {
//       throw new Error(`Request for match data failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error retrieving match data:', error);
//     return null;
//   }
// }

// async function getPuuidByName(name){
//   try {
//     const response = await fetch(`https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`, {
//       headers: {
//         'X-Riot-Token': API_KEY
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`a Request failed with status ${response.status}`);
//     }

//     const res = await response.json();
//     return res;
//     }
//     catch (error) {
//       console.error('Error retrieving Puuid:', error);
//     }
// }

// async function getRankBySummonerId(summonerId){
//   try {
//     const response = await fetch(`https://${REGION}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
//       headers: {
//         'X-Riot-Token': API_KEY
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`a Request failed with status ${response.status}`);
//     }

//     const res = await response.json();
//     return res;
//     }
//     catch (error) {
//       console.error('Error retrieving Rank Info:', error);
//     }
// }

// async function getMostRecentGames(puuid){
//   try {
//     const response = await fetch(`https://${REGION2}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, {
//       headers: {
//         'X-Riot-Token': API_KEY
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`The Request failed with status ${response.status}`);
//     }

//     const res = await response.json();
//     return res;
//     }
//     catch (error) {
//       console.error('Error retrieving champion ID:', error);
//     }
// }

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// // Test the connection
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   console.log('Connected to PostgreSQL!');
//   release();
// });

// async function addMatchToDatabase(matchData) {
//   try {

//     const { matchId } = matchData.metadata;
//     const { platformId: region, gameMode, gameDuration} = matchData.info;
//     const winner = matchData.info.participants[0].win;
//     const timestamp = Math.floor(matchData.info.gameCreation / 1000);
//     const postgresTimestamp = new Date(timestamp * 1000).toISOString();

//     const participants = JSON.stringify(
//       matchData.info.participants.map(({ summonerName, championId, kills, deaths, assists }) => ({
//         summonerName,
//         championId,
//         kills,
//         deaths,
//         assists,
//       })));

//     // SQL query to insert the match data into the matches table
//     const query = `INSERT INTO matches (matchId, region, gameMode, gameDuration, timestamp, winner, participants) 
//                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

//     // Data to be inserted
//     const values = [
//       matchId,
//       region,
//       gameMode,
//       gameDuration,
//       postgresTimestamp,
//       winner,
//       participants,
//     ];

//     // Execute the query
//     const result = await pool.query(query, values);
//     console.log('Match added successfully!', result.rowCount);

//     // Loop through each participant in the matchData.info.participants array
//     for (const participant of matchData.info.participants) {
//       // Destructure participant data
//       const {
//         summonerName,
//         championName,
//         lane,
//         role,
//         kills,
//         deaths,
//         assists,
//         goldEarned,
//         win,
//         totalDamageDealtToChampions: damageDealt,
//         totalDamageTaken: damageTaken,
//         // Add other relevant participant data here
//       } = participant;

//       // SQL query to insert participant data into participants table
//       const queryParticipant = `INSERT INTO participants (matchid, playerid, champion, role, lane) 
//                                 VALUES ($1, $2, $3, $4, $5)
//                                 RETURNING participantId`;

//       // Data to be inserted for participants
//       const valuesParticipant = [
//         matchId,
//         summonerName,
//         championName,
//         role,
//         lane
//       ];

//       // Execute the query to insert participant data
//       let result = await pool.query(queryParticipant, valuesParticipant);
//       console.log(result.rows[0].participantid);
//       const generatedParticipantId = result.rows[0].participantid;
//       console.log("Participant " + generatedParticipantId + " has been added");

//       // SQL query to insert participant stats data into participant_stats table
//       const queryParticipantStats = `INSERT INTO participant_stats (matchid, participantid, win, kills, deaths, assists, damagedealt, damagetaken, goldearned)
//                                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

//       // Data to be inserted for participant stats
//       const valuesParticipantStats = [
//         matchId,
//         generatedParticipantId,
//         win,
//         kills,
//         deaths,
//         assists,
//         damageDealt,
//         damageTaken,
//         goldEarned,
//       ];

//       // Execute the query to insert participant stats data
//       await pool.query(queryParticipantStats, valuesParticipantStats);
//       console.log("Participant " + generatedParticipantId + " stats have been added");
//     }
//   } catch (error) {
//     // Check if the error is due to a duplicate matchId
//     if (error.code === '23505') {
//       console.log('Match with the same matchId already exists in the database.');
//       // Handle the duplicate matchId error here
//     } else {
//       // Handle other errors
//       console.error('Error inserting match:', error);
//     }
//   }
// }

// // pool.query(`
// // SELECT Count(*) as total_matches,
// // Sum(case when win = true then 1 else 0 end) as total_wins,
// // Sum(case when win = false then 1 else 0 end) as total_losses,
// // (CAST(SUM(CASE WHEN win = true THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*)) * 100 AS win_rate
// // from participant_stats inner join participants on participants.participantid = participant_stats.participantid
// // where participants.playerid = 'Mazee'
// // `, (err, result) => {
// //   if (err) {
// //     return console.error('Error executing query', err.stack);
// //   }
// //   console.log('Query result:', result.rows);
// // });

// app.listen(8000, () => {
//   console.log(`Server is running on port 8000.`);
// });

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const pool = require('./db');

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL!');
  release();
});

app.use(cors());
app.use(express.json());

// Import route modules
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Use route modules as middleware
app.use('/user', userRoutes);
app.use('/match', matchRoutes);


// ... Other configurations and setup ...

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});