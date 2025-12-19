import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setToken(res.data.token);
      setRole(res.data.role);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        if (res.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', background: '#1e1e2e', borderRadius: '16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login to TrustraFx</h2>
      {error && <p style={{ color: 'red', textAlign: 'center', padding: '10px', background: '#4a1a1a', borderRadius: '8px' }}>{error}</p>}
      {success && <p style={{ color: '#60a5fa', textAlign: 'center', padding: '10px', background: '#1a2a4a', borderRadius: '8px' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '16px' }}>
        New to TrustraFx? <a href="/register" style={{ color: '#60a5fa' }}>Create an account</a>
      </p>
    </div>
  );
}
