const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Crucial: to read JSON from frontend forms

// Existing root route (you already have this)
app.get('/', (req, res) => {
  res.json({ message: 'TrustraFx API running 🚀' });
});

// NEW: Register route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  console.log('New registration attempt:', { username, email });  // For debugging

  // TEMPORARY: Always succeed for testing (remove later)
  // Later: Add real logic – check DB for duplicate email, hash password, save user
  res.json({ 
    success: true, 
    message: 'Account created successfully! Please login.' 
  });

  // If duplicate: res.status(400).json({ error: 'Email already exists' });
});

// OPTIONAL: Add login route too
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Temporary test success
  res.json({ success: true, message: 'Login successful!', token: 'fake-jwt-token' });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
