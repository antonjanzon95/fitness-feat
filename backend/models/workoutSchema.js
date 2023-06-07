const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: String,
  duration: Number, // e.g., in minutes
  intensity: String, // e.g., "low", "medium", "high"
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
