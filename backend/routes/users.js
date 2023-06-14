const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const { validateAccessToken } = require('../middleware/auth0.middleware');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

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

router.post('/login', validateAccessToken, async (req, res, next) => {
  const { auth0Id, name, email, picture } = req.body;

  const userExists = await User.findOne({ auth0Id: auth0Id });

  if (userExists) {
    return res.status(200).json({ message: 'User who exists logged in' });
  }

  try {
    await User.create({
      auth0Id: auth0Id,
      id: uuidv4(),
      name: name,
      email: email,
      picture: picture,
    });
    res.status(201).json({ message: 'User successfully added' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user ' + error });
  }
});

module.exports = router;
