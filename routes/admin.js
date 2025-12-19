const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Investment = require('../models/Investment');

// Get all users (admin only)
router.get('/users', auth(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all investments (admin only)
router.get('/investments', auth(['admin']), async (req, res) => {
  try {
    const investments = await Investment.find().populate('user', 'username email');
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
