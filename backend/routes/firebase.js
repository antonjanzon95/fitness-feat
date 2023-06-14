const express = require('express');
const router = express.Router();
const { validateAccessToken } = require('../middleware/auth0.middleware');
const { attachUserToRequest } = require('../middleware/attach-user.middleware');
const admin = require('../services/firebase-config');

async function createFirebaseToken(auth0UserId) {
  try {
    // Here the auth0UserId is used as the uid for the Firebase custom token.
    const firebaseToken = await admin.auth().createCustomToken(auth0UserId);

    // Return the token to the client app.
    return firebaseToken;
  } catch (error) {
    throw error;
  }
}

router.post(
  '/getToken',
  validateAccessToken,
  attachUserToRequest,
  async (req, res) => {
    const { dbUser } = req.user;

    try {
      const auth0Id = dbUser.auth0Id;

      if (!auth0Id) {
        return res.status(403).json({ message: 'Unauthorized request' });
      }

      const firebaseToken = await createFirebaseToken(auth0Id);
      res.status(200).json({ firebaseToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating Firebase token');
    }
  }
);
module.exports = router;
