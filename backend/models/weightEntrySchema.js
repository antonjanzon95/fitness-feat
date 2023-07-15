const mongoose = require('mongoose');

// Define the weight entry schema
const weightEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weight: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
});

// Create the weight entry model
const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);

module.exports = WeightEntry;
