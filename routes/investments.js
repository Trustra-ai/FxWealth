const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // we'll create this
const Investment = require("../models/Investment");

// Create investment
router.post("/", auth, async (req, res) => {
  try {
    const { plan, amount } = req.body;
    const investment = new Investment({
      userId: req.user.id,
      plan,
      amount,
    });
    await investment.save();
    res.json(investment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's investments
router.get("/", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id });
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
