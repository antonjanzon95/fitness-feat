const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
