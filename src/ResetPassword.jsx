import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  if (!token) {
    return <p>❌ Invalid or missing token in URL.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <h2 className="login-title">Reset Password</h2>
          <p className="login-subtitle">Enter your new password</p>
          <form className="login-form" onSubmit={handleSubmit}>
            {message && <div className="message success">{message}</div>}
            {error && <div className="message error">{error}</div>}

            <input
              type="password"
              placeholder="New Password"
              className="login-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="login-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
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
}

export default ResetPassword;
