import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User created successfully! Redirecting to login...");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-left">
          <h2 className="login-title">System Metrics Dashboard</h2>
          <p className="login-subtitle">Create Account</p>
          <form className="login-form" onSubmit={handleSubmit}>
            {message && <div className="message success">{message}</div>}
            {error && <div className="message error">{error}</div>}

            <input
              type="text"
              placeholder="Enter Mail ID"
              className="login-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Create Account</button>
            <div className="forgot-link">
              <Link to="/login">Back to Login</Link>
            </div>
          </form>
        </div>

        <div className="login-divider"></div>

        <div className="login-right">
          <div className="smd-logo">
            <span className="smd-text">SM</span>
            <span className="smd-text">D</span>
          </div>
          <div className="smd-subtitle">SYSTEM METRICS DASHBOARD</div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
