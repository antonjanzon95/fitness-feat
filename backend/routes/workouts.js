const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutSchema');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const User = require('../models/userSchema');

router.get(
  '/',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { dbUser } = req.user;

    try {
      const workouts = await Workout.find({ user: dbUser._id });

      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching workouts: ', error });
    }
  }
);

router.post(
  '/add',
  validateAccessToken,
  attachUserToRequest,
  async (req, res, next) => {
    const { type, duration, intensity } = req.body;
    const { dbUser } = req.user;

    const user = await User.findById(dbUser._id);

    if (!user) return res.status(404).json({ message: 'No user found' });

    try {
      user.totalWorkoutTime += duration;
      await user.save();

      const newWorkout = await Workout.create({
        user: user._id,
        date: Date.now(),
        type: type,
        duration: duration,
        intensity: intensity,
      });

      return res.status(201).json(newWorkout);
    } catch (err) {
      return res.status(500).json({ message: 'Error adding workout: ', err });
    }
  }
);

module.exports = router;
