const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Investment = require("../models/Investment");

// Get all users
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all investments
router.get("/investments", auth, admin, async (req, res) => {
  try {
    const investments = await Investment.find().populate("userId", "name email");
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user balance
router.patch("/user/:id/balance", auth, admin, async (req, res) => {
  try {
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { balance }, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
