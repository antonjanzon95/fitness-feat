const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  bio: String,
  goals: String,
  workoutHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  challengesJoined: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
