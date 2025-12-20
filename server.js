app.get('/api/quotes/:symbol', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${req.params.symbol}&to_symbol=USD&interval=5min&apikey=${process.env.FOREX_API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});
