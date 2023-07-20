const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Challenge = require('../models/challengeSchema');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const User = require('../models/userSchema');

router.get('/all', async function (req, res, next) {
  try {
    const challenges = await Challenge.find({ visibility: 'public' })
      .populate('creator', 'name picture')
      .populate('participants', 'name picture')
      .exec();

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
  '/current',
  validateAccessToken,
  attachUserToRequest,
  async (req, res, next) => {
    const { challengeId } = req.body;

    try {
      const challenge = await Challenge.findById(challengeId)
        .populate('creator participants weightEntries')
        .populate({
          path: 'weightEntries',
          populate: { path: 'user', select: 'name' },
        });

      return res.status(200).json(challenge);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching challenge: ', error });
    }
  }
);

router.post(
  '/add',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { name, description, visibility, startDate, endDate } = req.body;
    const { dbUser } = req.user;

    const user = await User.findById(dbUser._id);

    if (!user) {
      return res
        .status(500)
        .json({ message: 'Non-user cannot create a challenge.' });
    }

    try {
      const newChallenge = await Challenge.create({
        name: name,
        creator: user._id,
        description: description,
        visibility: visibility,
        startDate: startDate,
        endDate: endDate,
        weightEntries: [],
        participants: [user._id],
      });

      user.challengesJoined.push(newChallenge._id);

      await user.save();

      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(500).json({ message: 'Error creating challenge: ', error });
    }
  }
);

module.exports = router;
