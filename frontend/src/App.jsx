import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Welcome to TrustraFx</h1>
      <p>Secure Forex & Crypto Investment Platform</p>
      <div style={{ margin: '30px 0' }}>
        <a href="/register" style={{ margin: '0 10px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none' }}>Register</a>
        <a href="/login" style={{ margin: '0 10px', padding: '10px 20px', background: '#28a745', color: 'white', textDecoration: 'none' }}>Login</a>
      </div>
    </div>
  );
}

export default App;i
