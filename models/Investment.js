const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true }, // Example: "Basic", "Pro"
  amount: { type: Number, required: true },
  status: { type: String, default: "active" }, // active, completed
}, { timestamps: true });

module.exports = mongoose.model("Investment", InvestmentSchema);
