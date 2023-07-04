const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { v4: uuidv4 } = require('uuid');

router.get(
  '/user',
  validateAccessToken,
  attachUserToRequest,
  async function (req, res, next) {
    const { dbUser } = req.user;

    try {
      const user = await User.findById(dbUser._id).populate();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error finding user: ', error });
    }
  }
);

router.post(
  '/user/image',
  validateAccessToken,
  attachUserToRequest,
  async (req, res, next) => {
    const { dbUser } = req.user;
    const { imageUrl } = req.body;

    try {
      const user = await User.findById(dbUser._id);
      user.picture = imageUrl;
      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user image' });
    }
  }
);

router.post('/login', validateAccessToken, async (req, res, next) => {
  const { auth0Id, name, email, picture } = req.body;

  const userFromDb = await User.findOne({ email: email }).populate();

  if (userFromDb) {
    return res.status(200).json(userFromDb);
  }

  try {
    const user = await User.create({
      auth0Id: auth0Id,
      id: uuidv4(),
      name: name,
      email: email,
      picture: picture,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user ' + error });
  }
});

module.exports = router;
