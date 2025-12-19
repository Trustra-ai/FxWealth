import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const [usersRes, investmentsRes] = await Promise.all([
        axios.get('/users'),
        axios.get('/investments')
      ]);
      setUsers(usersRes.data);
      setInvestments(investmentsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveInvestment = async (id) => {
    try {
      await axios.put(`/investments/${id}/approve`);
      setMessage('Investment approved successfully!');
      fetchData(); // Refresh data
    } catch (err) {
      setMessage('Approval failed');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Admin Dashboard</h1>
      {message && (
        <p style={{ color: '#60a5fa', fontWeight: 'bold', padding: '15px', background: '#1e1e2e', borderRadius: '12px', marginBottom: '30px' }}>
          {message}
        </p>
      )}

      <h2 style={{ marginBottom: '20px' }}>Platform Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        <div style={{ background: '#1e1e2e', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px' }}>Total Users</p>
          <h3 style={{ fontSize: '32px', color: '#60a5fa' }}>{users.length}</h3>
        </div>
        <div style={{ background: '#1e1e2e', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px' }}>Total Investments</p>
          <h3 style={{ fontSize: '32px', color: '#60a5fa' }}>{investments.length}</h3>
        </div>
        <div style={{ background: '#1e1e2e', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px' }}>Pending Approval</p>
          <h3 style={{ fontSize: '32px', color: '#fb923c' }}>{investments.filter(i => i.status === 'pending').length}</h3>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Pending Investments for Approval</h2>
      {investments.filter(inv => inv.status === 'pending').length === 0 ? (
        <p style={{ fontSize: '18px', color: '#9ca3af' }}>No pending investments at this time.</p>
      ) : (
        <div style={{ display: 'grid', gap: '25px' }}>
          {investments.filter(inv => inv.status === 'pending').map(inv => (
            <div key={inv._id} style={{ background: '#1e1e2e', padding: '30px', borderRadius: '16px', border: '1px solid #3b3b5b' }}>
              <p><strong>User:</strong> {inv.user?.username || 'Unknown'}</p>
              <p><strong>Email:</strong> {inv.user?.email || 'N/A'}</p>
              <p><strong>Plan:</strong> {inv.plan}</p>
              <p><strong>Amount:</strong> ${inv.amount}</p>
              <p><strong>Submitted:</strong> {new Date(inv.createdAt).toLocaleString()}</p>
              <button
                onClick={() => approveInvestment(inv._id)}
                style={{ background: '#16a34a', padding: '15px 30px', marginTop: '15px', fontSize: '18px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Approve Investment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
