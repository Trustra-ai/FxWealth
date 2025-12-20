import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { createChart, ColorType } from 'lightweight-charts';

function App() {
  const [page, setPage] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const forexChartContainerRef = useRef();
  const cryptoChartContainerRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Load Charts when logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    // Forex Chart (EUR/USD)
    const forexChart = createChart(forexChartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: '#ffffff' }, textColor: '#000' },
      width: forexChartContainerRef.current.clientWidth,
      height: 300,
    });
    const forexSeries = forexChart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });

    axios.get('/api/quotes/EURUSD')
      .then(res => {
        const timeSeries = res.data['Time Series FX (5min)'] || res.data['Time Series FX (Daily)'];
        if (timeSeries) {
          const data = Object.entries(timeSeries)
            .slice(0, 100)
            .reverse()
            .map(([time, values]) => ({
              time: time.split(' ')[0],
              open: parseFloat(values['1. open']),
              high: parseFloat(values['2. high']),
              low: parseFloat(values['3. low']),
              close: parseFloat(values['4. close']),
            }));
          forexSeries.setData(data);
        }
      })
      .catch(() => {
        // Fallback message if rate limited
        setMessage('Forex data temporarily limited');
      });

    // Crypto Chart (BTC/USD from CoinGecko - free & real-time)
    const cryptoChart = createChart(cryptoChartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: '#ffffff' }, textColor: '#000' },
      width: cryptoChartContainerRef.current.clientWidth,
      height: 300,
    });
    const cryptoSeries = cryptoChart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350',
    });

    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
      .then(res => res.json())
      .then(data => {
        const prices = data.prices;
        const candleData = prices.map((p, i) => {
          const open = prices[i][1];
          const close = prices[i + 1]?.[1] || open;
          const high = Math.max(open, close);
          const low = Math.min(open, close);
          return {
            time: new Date(p[0]).toISOString().split('T')[0],
            open,
            high,
            low,
            close,
          };
        }).filter((_, i) => i % 2 === 0); // Reduce density
        cryptoSeries.setData(candleData);
      });

    // Responsive
    const handleResize = () => {
      forexChart.applyOptions({ width: forexChartContainerRef.current.clientWidth });
      cryptoChart.applyOptions({ width: cryptoChartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoggedIn]);

  const register = async () => {
    try {
      await axios.post('/api/auth/register', { email, password });
      setMessage('Registered successfully! Now login.');
      setPage('login');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPage('home');
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial' }}>
        <h1 style={{ textAlign: 'center' }}>TrustraFx Dashboard</h1>
        <p style={{ textAlign: 'center' }}>Welcome back!</p>
        <p style={{ textAlign: 'center', fontSize: '20px' }}>Balance: $0.00</p>

        <h2>Live Forex Chart (EUR/USD)</h2>
        <div ref={forexChartContainerRef} style={{ marginBottom: '40px' }} />

        <h2>Live Crypto Chart (BTC/USD)</h2>
        <div ref={cryptoChartContainerRef} />

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={logout} style={{ padding: '12px 24px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Home Page
  if (page === 'home') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h1>Welcome to TrustraFx</h1>
        <p>Secure Forex & Crypto Investment Platform</p>
        <div style={{ margin: '40px 0' }}>
          <button onClick={() => setPage('register')} style={{ margin: '10px', padding: '15px 30px', fontSize: '18px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}>
            Register
          </button>
          <button onClick={() => setPage('login')} style={{ margin: '10px', padding: '15px 30px', fontSize: '18px', background: '#388e3c', color: 'white', border: 'none', borderRadius: '5px' }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // Register Page
  if (page === 'register') {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Create Your Account</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
        <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
        <button onClick={register} style={{ width: '100%', padding: '12px', background: '#1976d2', color: 'white' }}>Register</button>
        <p>{message}</p>
        <p><a onClick={() => setPage('login')} style={{ color: '#1976d2', cursor: 'pointer' }}>Already have an account? Login</a></p>
      </div>
    );
  }

  // Login Page
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login to TrustraFx</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
      <button onClick={login} style={{ width: '100%', padding: '12px', background: '#388e3c', color: 'white' }}>Login</button>
      <p>{message}</p>
      <p><a onClick={() => setPage('register')} style={{ color: '#1976d2', cursor: 'pointer' }}>No account? Register here</a></p>
    </div>
  );
}

export default App;
