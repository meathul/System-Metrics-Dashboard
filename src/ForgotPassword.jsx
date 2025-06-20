import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset link sent to your email.");
      } else {
        throw new Error(data.error || "Failed to send reset link.");
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
          <p className="login-subtitle">Forgot Password</p>
          <form className="login-form" onSubmit={handleSubmit}>
            {message && <div className="message success">{message}</div>}
            {error && <div className="message error">{error}</div>}

            <input
              type="text"
              placeholder="Enter your username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">Send Reset Link</button>

            <div className="forgot-link">
              <Link to="/">Back to Login</Link>
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

export default ForgotPassword;
