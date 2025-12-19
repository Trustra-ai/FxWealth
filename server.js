const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/investments', require('./routes/investments'));
app.use('/api/admin', require('./routes/admin'));

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'TrustraFx API running 🚀' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'TrustraFx' })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB error:', err));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
