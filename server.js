app.get('/api/quotes/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase(); // e.g., "EURUSD"
    const apiKey = process.env.FOREX_API_KEY; // You'll set this in Render env vars

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${symbol.substring(0, 3)}&to_symbol=${symbol.substring(3)}&interval=5min&apikey=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('Forex API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});
