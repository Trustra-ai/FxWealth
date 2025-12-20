const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import Routes
app.use('/api/auth', require('./routes/auth'));

// Live Forex Quotes (Alpha Vantage - Real Market Data)
app.get('/api/quotes/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const apiKey = process.env.FOREX_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Forex API key not configured on server' });
    }

    if (symbol.length !== 6) {
      return res.status(400).json({ error: 'Invalid pair. Use format like EURUSD' });
    }

    const from = symbol.substring(0, 3);
    const to = symbol.substring(3);

    const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from}&to_symbol=${to}&interval=5min&apikey=${apiKey}`;

    const response = await axios.get(url, { timeout: 10000 });
    res.json(response.data);
  } catch (err) {
    console.error('Alpha Vantage error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch live Forex data',
      details: err.message 
    });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TrustraFx API running 🚀' });
});

// Serve React Frontend (Production)
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Fallback for React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`TrustraFx server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
