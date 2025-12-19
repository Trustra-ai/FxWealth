const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Investment = require("../models/Investment");

// Get all users (admin only)
router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all investments (admin only)
router.get("/investments", auth, admin, async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
});

module.exports = router;<<<<<<< HEAD
const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/users", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  const users = await User.find().select("-password");
  res.json(users);
=======
# [paste admin.js content here]
EOFcd ~/FxWealth/backend/routes
cat > admin.js << 'EOF'
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
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { balance },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
>>>>>>> e9b79a2 (Replace server.js with fixed version for Termux and Mongoose 7+)
});

module.exports = router;
