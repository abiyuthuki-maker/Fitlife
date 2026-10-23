
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

import {
  ArrowRight,
  Dumbbell,
  Brain,
  Flame,
  HeartPulse,
  LogIn,
  LogOut,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("token") ||
      localStorage.getItem("fitlifeToken") ||
      localStorage.getItem("fitlife_token")
    );
  });

  // Update the login status when returning to Home.
  useEffect(() => {
    const checkLoginStatus = () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("fitlifeToken") ||
        localStorage.getItem("fitlife_token");

      setIsLoggedIn(Boolean(token));
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location.pathname]);

  // Log out the current user.
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fitlifeToken");
    localStorage.removeItem("fitlife_token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="home-page">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={20} />
          </span>

          FIT<span>LIFE</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>

          <Link to="/wellness">
            Wellness
          </Link>

          <Link to="/ai-form-check">
            AI Form Check
          </Link>

          <Link to="/nutrition">
            Nutrition
          </Link>

          <Link to="/progress">
            Progress
          </Link>

          <Link to="/delivery">
            Delivery
          </Link>

          {isLoggedIn ? (
            <button
              type="button"
              className="nav-login"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-login">
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <span className="section-label">
            AI-POWERED FITNESS &amp; WELLNESS
          </span>

          <h1>
            Train Smarter.
            <br />
            Live <span>Stronger.</span>
          </h1>

          <p>
            Your complete fitness and wellness platform.
            Work out, improve your form, relax your mind,
            track your progress and build a healthier lifestyle.
          </p>

          <div className="hero-buttons">
            <Link to="/wellness" className="primary-button">
              Explore Wellness
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85"
            alt="Person exercising in a gym"
          />

          <div className="hero-image-overlay"></div>

          <div className="hero-stat">
            <Flame size={18} />

            <div>
              <strong>Stay Active</strong>
              <span>Build healthy habits</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE STRIP ================= */}
      <section className="feature-strip">
        <div className="feature-item">
          <Dumbbell />

          <div>
            <strong>Smart Workouts</strong>
            <span>Train at your level</span>
          </div>
        </div>

        <div className="feature-item">
          <HeartPulse />

          <div>
            <strong>Yoga &amp; Wellness</strong>
            <span>Body and mind balance</span>
          </div>
        </div>

        <div className="feature-item">
          <Brain />

          <div>
            <strong>AI Form Check</strong>
            <span>Improve your exercise form</span>
          </div>
        </div>

        <div className="feature-item">
          <Flame />

          <div>
            <strong>Progress Tracking</strong>
            <span>See your improvements</span>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={18} />
          </span>

          FIT<span>LIFE</span>
        </Link>

        <p>
          © 2026 FITLIFE.
          Your fitness. Your wellness. Your life.
        </p>
      </footer>
    </div>
  );
}

export default Home;
