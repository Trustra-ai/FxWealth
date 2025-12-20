const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Investment = require('../models/Investment');

// Get user's investments (user + admin)
router.get('/', auth(['user', 'admin']), async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.id });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create new investment (user only)
router.post('/', auth(['user']), async (req, res) => {
  const { plan, amount } = req.body;

  try {
    const investment = new Investment({
      user: req.user.id,
      plan,
      amount
    });

    await investment.save();
    res.json(investment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
