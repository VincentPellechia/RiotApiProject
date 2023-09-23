const getPuuidByName = require("../utils/getPuuidByName"); // Import your utility functions
const getRankBySummonerId = require("../utils/getRankBySummonerId");
const getChampionsData = require("../utils/getChampionsData");

const getUser = async (req, res) => {
  try {
    const name = req.body.userName;
    const region = req.body.region;
    const puuid = await getPuuidByName(name, region);

    res.json({ user: puuid });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getRank = async (req, res) => {
  try {
    const summonerId = req.body.summonerId;
    const region = req.body.region;
    const rankInfo = await getRankBySummonerId(summonerId, region);

    res.json({ rankInfo: rankInfo });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getChampions = async (req, res) => {
  try {
    const summonerId = req.body.summonerId;
    const region = req.body.region;
    const rankInfo = await getChampionsData(summonerId, region);

    res.json({ rankInfo: rankInfo });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Define other user controllers here

module.exports = {
  getUser,
  getRank,
  getChampions,
  // Export other user controllers here
};
