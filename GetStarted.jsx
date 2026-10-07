import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

function GetStarted() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      return;
    }

    // Temporary signup navigation.
    // Backend registration can be connected later.
    navigate("/login");
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
              START TODAY
            </span>

            <h1>
              Build Your
              <span> Strongest Life.</span>
            </h1>

            <p>
              Create your FITLIFE account and start
              your personalized fitness and wellness
              journey.
            </p>


            <div className="auth-benefits">

              <div>
                <CheckCircle size={19} />
                <span>Smart workout plans</span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>AI-powered form guidance</span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>Fitness progress tracking</span>
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
              Create Account 🚀
            </h2>

            <p>
              Start your FITLIFE journey today
            </p>

          </div>


          <form onSubmit={handleSignup}>

            <div className="form-group">

              <label htmlFor="signup-name">
                Full Name
              </label>

              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="signup-email">
                Email Address
              </label>

              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="password-input">

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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


            <label className="terms-check">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the FITLIFE Terms &
                Privacy Policy.
              </span>

            </label>


            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
              <ArrowRight size={19} />
            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <div className="auth-signup">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default GetStarted;