const express = require('express');
const router = express.Router();
const WeightEntry = require('../models/weightEntrySchema');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const User = require('../models/userSchema');

router.get(
  '/',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { dbUser } = req.user;

    try {
      const userWeightEntries = await WeightEntry.find({
        user: dbUser._id,
      }).populate();

      return res.status(200).json(userWeightEntries);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching weight entries: ', error });
    }
  }
);

router.post('/challenge', validateAccessToken, async (req, res, next) => {
  const { challengeId } = req.body;

  try {
    const challengeWeightEntries = await WeightEntry.find({
      challenge: challengeId,
    }).populate('user');

    return res.status(200).json(challengeWeightEntries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching weight entries: ', error });
  }
});

router.post(
  '/challenge/add',
  validateAccessToken,
  attachUserToRequest,
  async (req, res, next) => {
    const { dbUser } = req.user;
    const { weight, date = new Date(), challengeId } = req.body;

    const user = await User.findById(dbUser._id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    try {
      const lastEntry = await WeightEntry.findOne({
        user: user._id,
        challenge: challengeId,
      }).sort('-timestamp');

      if (lastEntry) {
        const nextEntryDate = new Date(lastEntry.timestamp);
        nextEntryDate.setDate(nextEntryDate.getDate() + 7);

        const now = new Date();

        if (now < nextEntryDate) {
          const timeLeft = (nextEntryDate - now) / 1000 / 60 / 60 / 24;

          if (timeLeft < 0.041) {
            timeLeft = timeLeft * 24 * 60;
            return res.status(400).json({
              message: `You can only add one weight entry per week. ${Math.ceil(
                timeLeft
              )} minutes left.`,
            });
          } else if (timeLeft < 1) {
            timeLeft *= 24;
            return res.status(400).json({
              message: `You can only add one weight entry per week. ${Math.ceil(
                timeLeft
              )} hours left.`,
            });
          }

          return res.status(400).json({
            message: `You can only add one weight entry per week. ${Math.ceil(
              timeLeft
            )} ${timeLeft < 2 ? 'day' : 'days'} left.`,
          });
        }
      }

      await WeightEntry.create({
        user: user._id,
        weight: weight,
        timestamp: date,
        challenge: challengeId,
      });

      if (user.startingWeight === 0) {
        user.startingWeight = weight;
      }

      user.currentWeight = weight;

      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error adding weight entry: ', error });
    }
  }
);

router.post(
  '/add',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { dbUser } = req.user;
    const { weight, date = new Date() } = req.body;

    const user = await User.findById(dbUser._id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    try {
      await WeightEntry.create({
        user: user._id,
        weight: weight,
        timestamp: date,
      });

      if (user.startingWeight === 0) {
        user.startingWeight = weight;
      }

      user.currentWeight = weight;

      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error adding weight entry: ', error });
    }
  }
);

module.exports = router;
