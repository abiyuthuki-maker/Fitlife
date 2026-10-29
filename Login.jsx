
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Login.css";

const API_URL = "http://localhost:5000/api/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error(
          "The server returned an unexpected response. Please check your backend."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Invalid email or password.");
      }

      // Support common JWT response formats.
      const token = data.token || data.accessToken || data.access_token;

      if (!token) {
        throw new Error(
          "Login response did not contain a JWT token. Check your backend response."
        );
      }

      // Store the JWT token.
      localStorage.setItem("fitlife-token", token);

      // Store the authenticated user's information, if provided.
      if (data.user) {
        localStorage.setItem(
          "fitlife-user",
          JSON.stringify(data.user)
        );
      }

      // Navigate to the protected Wellness page.
      navigate("/wellness", { replace: true });
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the server. Please make sure your backend is running on port 5000."
        );
      } else {
        setError(
          err.message || "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
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
            disabled={loading}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="email"
              required
              disabled={loading}
            />

            <label htmlFor="password">Password</label>

            <div className="login-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
                disabled={loading}
              />

              <button
                type="button"
                className="login-eye-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to FITLIFE"}
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
