const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/getMatchesFromAPI", matchController.getMatchesFromAPI);
router.post("/getMatchesInfoFromAPI", matchController.getMatchesInfoFromAPI);
router.post("/getMatchesFromDatabase", matchController.getMatchesFromDatabase);
router.post(
  "/getMatchesInfoFromDatabase",
  matchController.getMatchesInfoFromDatabase
);
// Define other match routes here

module.exports = router;
