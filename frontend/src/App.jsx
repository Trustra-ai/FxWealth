import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [page, setPage] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const register = async () => {
    try {
      await axios.post('/api/auth/register', { email, password });
      setMessage('Registered! Now login.');
      setPage('login');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setMessage('Welcome!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPage('home');
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>TrustraFx Dashboard</h1>
        <p>Welcome back!</p>
        <p>Balance: $0.00 (deposit coming soon)</p>
        <button onClick={logout} style={{ padding: '10px 20px', background: 'red', color: 'white' }}>
          Logout
        </button>
      </div>
    );
  }

  if (page === 'register') {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Create Account</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <button onClick={register} style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white' }}>Register</button>
        <p>{message}</p>
        <p><a onClick={() => setPage('login')} style={{ cursor: 'pointer', color: 'blue' }}>Already have account? Login</a></p>
      </div>
    );
  }

  if (page === 'login') {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <button onClick={login} style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white' }}>Login</button>
        <p>{message}</p>
        <p><a onClick={() => setPage('register')} style={{ cursor: 'pointer', color: 'blue' }}>No account? Register</a></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to TrustraFx</h1>
      <p>Secure Forex & Crypto Investment Platform</p>
      <div style={{ margin: '30px 0' }}>
        <button onClick={() => setPage('register')} style={{ margin: '10px', padding: '15px 30px', background: '#007bff', color: 'white' }}>Register</button>
        <button onClick={() => setPage('login')} style={{ margin: '10px', padding: '15px 30px', background: '#28a745', color: 'white' }}>Login</button>
      </div>
      <div>
        <h2>Our Plans</h2>
        <p>Basic: 10% monthly (min $100)</p>
        <p>Premium: 20% monthly (min $1,000)</p>
        <p>VIP: 35% monthly (min $5,000)</p>
      </div>
    </div>
  );
}

export default App;
