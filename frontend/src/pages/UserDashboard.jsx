import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDashboard() {
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [investments, setInvestments] = useState([]);

  const fetchInvestments = async () => {
    try {
      const res = await axios.get('/investments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setInvestments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleInvest = async (e) => {
    e.preventDefault();
    try {  // ← THIS { WAS MISSING!
      await axios.post(
        '/investments',
        { plan, amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setMessage('Investment submitted! Waiting for admin approval.');
      setPlan('');
      setAmount('');
      fetchInvestments();
    } catch (err) {
      setMessage('Investment failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>User Dashboard</h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        Welcome back! Manage your investments below.
      </p>

      {message && (
        <p
          style={{
            color: message.includes('submitted') ? '#60a5fa' : 'orange',
            fontWeight: 'bold',
            padding: '15px',
            background: '#1e1e2e',
            borderRadius: '12px',
            marginBottom: '30px'
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          background: '#1e1e2e',
          padding: '30px',
          borderRadius: '16px',
          marginBottom: '50px'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Make a New Investment</h2>
        <form onSubmit={handleInvest} style={{ maxWidth: '500px' }}>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            style={{ padding: '12px', marginBottom: '15px', width: '100%' }}
            required
          >
            <option value="">Select Investment Plan</option>
            <option value="Basic">Basic - 10% Monthly</option>
            <option value="Premium">Premium - 20% Monthly</option>
            <option value="VIP">VIP - 35% Monthly</option>
          </select>

          <input
            type="number"
            placeholder="Amount in USD ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            required
            style={{ marginBottom: '20px', width: '100%', padding: '12px' }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Submit Investment
          </button>
        </form>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Your Investments</h2>

      {investments.length === 0 ? (
        <p>No investments yet. Make your first one above!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {investments.map((inv) => (
            <div
              key={inv._id}
              style={{
                background: '#1e1e2e',
                padding: '25px',
                borderRadius: '16px',
                border: '1px solid #3b3b5b'
              }}
            >
              <p><strong>Plan:</strong> {inv.plan}</p>
              <p><strong>Amount:</strong> ${inv.amount}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color:
                      inv.status === 'active'
                        ? '#4ade80'
                        : inv.status === 'pending'
                        ? '#fb923c'
                        : '#9ca3af',
                    fontWeight: 'bold'
                  }}
                >
                  {inv.status.toUpperCase()}
                </span>
              </p>
              <p>
                <strong>Submitted:</strong>{' '}
                {new Date(inv.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
