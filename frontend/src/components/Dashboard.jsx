import { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    // Optional: Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>TrustraFx Dashboard</h1>
      <p>Welcome back! Your investment journey starts here.</p>
      <div style={{ margin: '20px 0' }}>
        <h2>Account Balance</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$0.00</p>
      </div>
      <div style={{ margin: '20px 0' }}>
        <h2>Active Plan</h2>
        <p>None selected yet</p>
      </div>
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
        style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
