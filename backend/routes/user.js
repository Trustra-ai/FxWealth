router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Registration attempt:', { username, email }); // For logs

  // Temporary: Always succeed for testing
  res.json({ 
    success: true, 
    message: 'Account created successfully! Please login.' 
  });

  // Later: Add real logic - check duplicate, hash password, save to DB
});
