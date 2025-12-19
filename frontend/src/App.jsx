import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Set base URL for API
axios.defaults.baseURL = '/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!token) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
    return children;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
  };

  return (
    <Router>
      <nav>
        <a href="/">TrustraFx</a> | 
        {!token ? (
          <>
            <a href="/login">Login</a> | 
            <a href="/register">Register</a>
          </>
        ) : (
          <>
            {role === 'admin' ? <a href="/admin">Admin</a> : <a href="/dashboard">Dashboard</a>} | 
            <a href="#" onClick={logout}>Logout</a>
          </>
        )}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          <Route path="/register" element={<Register setToken={setToken} setRole={setRole} />} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user', 'admin']}><UserDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
