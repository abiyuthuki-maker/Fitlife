
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() && password) {
      alert("Demo login successful!");
      navigate("/wellness");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Fitness Image */}
        <div className="login-image-section">
          <img
            className="login-image"
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"
            alt="Modern gym and fitness equipment"
          />

          <div className="login-image-overlay">
            <div className="login-brand">
              <HeartPulse size={30} />
              <span>FITLIFE</span>
            </div>

            <div className="login-image-text">
              <span className="login-badge">
                YOUR FITNESS JOURNEY
              </span>

              <h2>
                Train Smarter.
                <br />
                <span>Live Stronger.</span>
              </h2>

              <p>
                Build healthy habits, improve your fitness,
                and become a stronger version of yourself.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <button
            type="button"
            className="login-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>

          <div className="login-mobile-logo">
            <HeartPulse size={28} />
            <span>FITLIFE</span>
          </div>

          <div className="login-heading">
            <h1>Welcome Back!</h1>
            <p>Login to continue your fitness journey.</p>
          </div>

          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="password">Password</label>

            <div className="login-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button type="submit" className="login-submit-button">
              Login to FITLIFE
            </button>
          </form>

          <p className="login-bottom-text">
            Your fitness. Your wellness. Your life.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
