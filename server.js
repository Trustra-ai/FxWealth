const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* ===================== API ROUTES ===================== */
app.use("/api/auth", require("./routes/auth"));

/* ===================== FOREX QUOTES ===================== */
app.get("/api/quotes/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    const response = await axios.get(
      `https://api.twelvedata.com/quote`,
      {
        params: {
          symbol,
          apikey: process.env.TWELVE_DATA_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Forex API error:", error.message);
    res.status(500).json({ error: "Failed to fetch forex data" });
  }
});

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server running" });
});

/* ===================== SERVE FRONTEND ===================== */
// IMPORTANT: this MUST be after API routes
const frontendPath = path.join(__dirname, "frontend", "dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
