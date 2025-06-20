import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage(`Welcome, ${data.username}!`);
        console.log("Login successful:", data);
        navigate('/dashboard');
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <h2 className="login-title">System Metrics Dashboard</h2>
          <p className="login-subtitle">Log In</p>
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

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#333" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3.5" stroke="#333" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.8 21.8 0 0 1 5.06-5.94M1 1l22 22" stroke="#333" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="login-btn">
              LOGIN
            </button>
            <div className="forgot-link">
              <Link to="/forgot-password">Forgot Password</Link>
              <span style={{ margin: '0 8px' }}>|</span>
              <Link to="/create-user">Create User</Link>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="login-divider"></div>

        {/* Right Panel */}
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

export default Login;
