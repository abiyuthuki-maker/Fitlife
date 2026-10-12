/*import React, { useState } from "react";
import {
  Dumbbell,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    alert("Account created successfully!");
  };

  return (
    <div className="register-page">

      {/* LEFT VISUAL */}
      <div className="register-visual">
        <div className="register-overlay"></div>

        <div className="register-visual-content">

          <a href="/" className="register-logo">
            <span className="register-logo-icon">
              <Dumbbell size={21} />
            </span>
            FIT<span>LIFE</span>
          </a>

          <div className="register-message">
            <span className="section-label">
              START YOUR JOURNEY
            </span>

            <h1>
              Build Your
              <br />
              <span>Best Self.</span>
            </h1>

            <p>
              Join FITLIFE and take control of your
              workouts, nutrition, wellness, and fitness
              progress — all in one place.
            </p>

            <div className="register-benefits">

              <div className="register-benefit">
                <CheckCircle size={18} />
                <span>Personalized workout plans</span>
              </div>

              <div className="register-benefit">
                <CheckCircle size={18} />
                <span>AI-powered form checking</span>
              </div>

              <div className="register-benefit">
                <CheckCircle size={18} />
                <span>Track your fitness progress</span>
              </div>

              <div className="register-benefit">
                <CheckCircle size={18} />
                <span>Nutrition & wellness guidance</span>
              </div>

            </div>
          </div>

          <div className="register-visual-footer">
            <ShieldCheck size={16} />
            Your fitness data is secure with FITLIFE.
          </div>

        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="register-form-area">

        <div className="register-form-container">

          {/* MOBILE LOGO */}
          <div className="mobile-register-logo">
            <span className="register-logo-icon">
              <Dumbbell size={19} />
            </span>
            FIT<span>LIFE</span>
          </div>

          {/* HEADING */}
          <div className="register-heading">
            <span className="section-label">
              CREATE ACCOUNT
            </span>

            <h2>Join FITLIFE</h2>

            <p>
              Create your account and start your
              fitness journey today.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">
                <User size={17} />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="input-wrapper">
                <Mail size={17} />

                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="register-password">
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={17} />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <Lock size={17} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label="Show or hide password"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <div className="register-agreement">

              <label className="agreement-label">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(e.target.checked)
                  }
                />

                <span>
                  I agree to the{" "}
                  <a href="#terms">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy">
                    Privacy Policy
                  </a>
                  .
                </span>

              </label>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit"
            >
              Create Account
              <ArrowRight size={17} />
            </button>

          </form>

          {/* DIVIDER */}
          <div className="register-divider">
            <span>OR</span>
          </div>

          {/* GOOGLE */}
          <div className="social-register">

            <button type="button">
              <span className="google-icon">
                G
              </span>

              Continue with Google
            </button>

          </div>

          {/* LOGIN */}
          <div className="login-existing">

            Already have an account?

            <a href="/login">
              Sign in
            </a>

          </div>

          <p className="register-terms">
            By creating an account, you agree to
            FITLIFE's Terms of Service and Privacy Policy.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;