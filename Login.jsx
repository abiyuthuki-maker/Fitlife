
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo only: no server authentication is connected.
    setSuccess("Login form submitted successfully!");

    // Connect your backend authentication here.
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <Link to="/" className="login-brand">
          <span className="login-brand-icon">
            <Dumbbell size={23} />
          </span>
          FIT<span>LIFE</span>
        </Link>

        <section className="login-card">
          <div className="login-icon">
            <UserRound size={28} />
          </div>

          <p className="login-eyebrow">WELCOME BACK</p>

          <h1>
            Login to <span>FITLIFE</span>
          </h1>

          <p className="login-description">
            Continue your fitness journey and build a healthier lifestyle.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email Address</label>

            <div className="login-input-wrap">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label htmlFor="login-password">Password</label>

            <div className="login-input-wrap">
              <Lock size={18} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="login-message login-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="login-message login-success" role="status">
                {success}
              </p>
            )}

            <button className="login-submit" type="submit">
              Login <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-divider">
            <span>YOUR FITNESS JOURNEY STARTS HERE</span>
          </div>

          <Link to="/" className="login-home-link">
            ← Back to Home
          </Link>
        </section>

        <p className="login-footer">
          © 2026 FITLIFE · Your fitness. Your wellness. Your life.
        </p>
      </div>
    </main>
  );
}