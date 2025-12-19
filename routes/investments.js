const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Investment = require('../models/Investment');
const User = require('../models/User');

// Get user's investments
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

    const user = await User.findById(req.user.id);
    user.investments.push(investment._id);
    await user.save();

    res.json(investment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin approve investment
router.put('/:id/approve', auth(['admin']), async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ msg: 'Not found' });

    investment.status = 'active';
    await investment.save();
    res.json(investment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
