const express = require('express');
const router = express.Router();
const WeightEntry = require('../models/weightEntrySchema');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const User = require('../models/userSchema');

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
