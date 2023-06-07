const { User } = require('../models/userSchema');

async function attachUserToRequest(req, res, next) {
  const { auth0Id } = req.user;

  const user = await User.findOne({ auth0Id: auth0Id });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  req.user.dbUser = user;

  next();
}

module.exports = { attachUserToRequest };
