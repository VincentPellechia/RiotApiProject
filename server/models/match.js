const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Other match-related fields
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;