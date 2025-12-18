const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  plan: String,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Investment", InvestmentSchema);
