const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwksClient = require('jwks-rsa');

dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const token = req.headers.authorization.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

  jwt.verify(token, getKey, (err, decodedToken) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Token verification failed' });
    } else {
      req.user = {};
      req.user.auth0Id = decodedToken.sub;

      next();
    }
  });
};

module.exports = {
  validateAccessToken,
};
