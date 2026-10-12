import React from "react";
import {
  ArrowRight,
  Play,
  Dumbbell,
  Brain,
  Flame,
  Clock,
  CheckCircle,
  HeartPulse,
  Music,
  ShoppingBag,
  LogIn,
} from "lucide-react";

function Home() {
  const workouts = [
    {
      title: "Full Body Workout",
      level: "Beginner",
      time: "20 min",
      calories: "180 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Strength Training",
      level: "Intermediate",
      time: "30 min",
      calories: "260 kcal",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "HIIT Cardio",
      level: "Advanced",
      time: "25 min",
      calories: "320 kcal",
      image:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <a href="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={20} />
          </span>

          FIT<span>LIFE</span>
        </a>

        <div className="nav-links">

          <a href="/" className="active">
            Home
          </a>

          <a href="/wellness">
            Wellness
          </a>


          <a href="/al form">
            AI Form Check
          </a>

          <a href="/nutrition">
            Nutrition
          </a>

          <a href="#progress">
            Progress
          </a>

         

          <a href="/delivery">
  Delivery
</a>

          <a href="/login" className="nav-login">
            <LogIn size={16} />
            Login
          </a>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-content">

          <span className="section-label">
            AI-POWERED FITNESS & WELLNESS
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

            <a
              href="/wellness"
              className="primary-button"
            >
              Explore Wellness
              <ArrowRight size={18} />
            </a>

            

          </div>

        </div>


        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85"
            alt="Fitness workout"
          />

          <div className="hero-image-overlay"></div>

          <div className="hero-stat">

            <Flame size={18} />

            <div>
              <strong>320</strong>
              <span>Calories Burned</span>
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
            <strong>Yoga & Wellness</strong>
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

        <div className="logo">

          <span className="logo-icon">
            <Dumbbell size={18} />
          </span>

          FIT<span>LIFE</span>

        </div>

        <p>
          © 2026 FITLIFE.
          Your fitness. Your wellness. Your life.
        </p>

      </footer>

    </div>
  );
}

export default Home;