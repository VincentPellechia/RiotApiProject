const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/getMatches', matchController.getMatches);
router.post('/getMatchInfo', matchController.getMatchInfo);
// Define other match routes here

module.exports = router;