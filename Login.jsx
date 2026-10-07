import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    // Temporary login navigation.
    // JWT backend authentication can be connected later.
    navigate("/");
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <section className="auth-brand">

        <div className="auth-brand-content">

          <Link to="/" className="logo auth-logo">
            <span className="logo-icon">
              <Dumbbell size={22} />
            </span>

            <span>
              FIT<span>LIFE</span>
            </span>
          </Link>

          <div className="auth-hero-text">

            <span className="section-label">
              WELCOME BACK
            </span>

            <h1>
              Continue Your
              <span> Fitness Journey.</span>
            </h1>

            <p>
              Sign in to continue tracking your workouts,
              progress, nutrition and AI-powered fitness
              guidance.
            </p>

            <div className="auth-benefits">

              <div>
                <CheckCircle size={19} />
                <span>Personalized workouts</span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>AI Form Check</span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>Track your progress</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* RIGHT SIDE */}
      <section className="auth-form-area">

        <div className="auth-form-box">

          <button
            type="button"
            className="auth-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>


          <div className="auth-heading">

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Login to your FITLIFE account
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

            </div>


            <div className="form-group">

              <div className="password-label">

                <label htmlFor="login-password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot Password?
                </button>

              </div>


              <div className="password-input">

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            <label className="remember-me">

              <input type="checkbox" />

              <span>
                Remember me
              </span>

            </label>


            <button
              type="submit"
              className="auth-submit"
            >
              Login
              <ArrowRight size={19} />
            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <div className="auth-signup">

            <span>
              Don't have an account?
            </span>

            <Link to="/get-started">
              Get Started
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;