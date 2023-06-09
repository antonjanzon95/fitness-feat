const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Challenge = require('../models/challengeSchema');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const User = require('../models/userSchema');

router.get('/all', async function (req, res, next) {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching challenges: ', error });
  }
});

router.get(
  '/participating',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { dbUser } = req.user;

    try {
      const user = await User.findById(dbUser._id).populate('challengesJoined');

      res.status(200).json(user.challengesJoined);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching challenges: ', error });
    }
  }
);

router.post(
  '/create',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { name, startDate, endDate } = req.body;
    const { dbUser } = req.user;

    const user = User.findById(dbUser._id);

    if (!user) {
      return res
        .status(500)
        .json({ message: 'Non-user cannot create a challenge.' });
    }

    try {
      const newChallenge = await Challenge.create({
        name: name,
        creator: user._id,
        startDate: startDate,
        endDate: endDate,
        participants: [user._id],
      });

      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(500).json({ message: 'Error creating challenge: ', error });
    }
  }
);

module.exports = router;