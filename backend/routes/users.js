var express = require('express');
var router = express.Router();
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const { validateAccessToken } = require('../middleware/auth0.middleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', validateAccessToken, async (req, res, next) => {
  const { auth0Id, name, email } = req.body;

  const userExists = await User.findOne({ auth0Id: auth0Id });

  if (userExists) {
    return res.status(200).json({ message: 'User who exists logged in' });
  }

  try {
    await User.create({
      auth0Id: auth0Id,
      name: name,
      email: email,
    });
    res.status(201).json({ message: 'User successfully added' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user ' + error });
  }
});

module.exports = router;
