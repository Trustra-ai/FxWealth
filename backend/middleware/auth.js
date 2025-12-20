const jwt = require('jsonwebtoken');
require('dotenv').config(); // If you use .env for JWT_SECRET

module.exports = function (req, res, next) {
  // Get token from header - CORRECT way using req.get()
  const token = req.get('x-auth-token') || (req.get('Authorization') || '').replace('Bearer ', '');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_fallback_secret');

    req.user = decoded.user || decoded; // Depends on how you signed the token
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
