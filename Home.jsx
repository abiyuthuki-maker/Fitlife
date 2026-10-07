import React from "react";
import {
  ArrowRight,
  Play,
  Dumbbell,
  Brain,
  Flame,
  Clock,
  CheckCircle,
  ChevronRight,
  HeartPulse,
  Music,
  ShoppingBag,
  User,
} from "lucide-react";

import "../App.css";

const workouts = [
  {
    title: "Full Body Workout",
    level: "Beginner",
    duration: "20 min",
    calories: "180 kcal",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Strength Training",
    level: "Intermediate",
    duration: "30 min",
    calories: "260 kcal",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "HIIT Cardio",
    level: "Advanced",
    duration: "25 min",
    calories: "320 kcal",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=90",
  },
];

const wellnessItems = [
  {
    title: "Yoga",
    label: "FLEXIBILITY",
    description:
      "Improve flexibility, balance, breathing, and body control with guided yoga sessions.",
    icon: "🧘",
  },
  {
    title: "Meditation",
    label: "RELAX",
    description:
      "Calm your mind with guided meditation, breathing exercises, and relaxation sessions.",
    icon: "🧘‍♂️",
  },
  {
    title: "Music",
    label: "ENERGY",
    description:
      "Listen to motivating playlists and energetic music while you train.",
    icon: "🎵",
  },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        <a href="#home" className="logo">
          <span className="logo-icon">
            <Dumbbell size={21} />
          </span>

          <span>
            FIT<span>LIFE</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home" className="active">
            Home
          </a>

          <a href="#workouts">
            Workouts
          </a>

          <a href="#wellness">
            Wellness
          </a>

          <a href="#ai-check">
            AI Form Check
          </a>

          <a href="#nutrition">
            Nutrition
          </a>

          <a href="#progress">
            Progress
          </a>

          <a href="#store">
            Store
          </a>
        </nav>

        <div className="nav-actions">
          <button className="login-btn">
            Login
          </button>

          <button className="signup-btn">
            Get Started
          </button>
        </div>

        <button className="mobile-menu">
          ☰
        </button>

      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="fitlife-page">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= HERO ================= */}

      <main>

        <section className="hero" id="home">

          <div className="hero-container">

            <div className="hero-content">

              <div className="hero-badge">
                <span className="badge-dot"></span>

                AI-powered fitness & wellness
              </div>

              <h1>
                Build Your
                <span> Strongest </span>
                Life
              </h1>

              <p>
                Your complete fitness companion. Train smarter,
                eat better, track your progress, and get real-time
                AI guidance — all in one place.
              </p>

              <div className="hero-buttons">

                <button className="primary-btn">
                  Start Your Journey
                  <ArrowRight size={18} />
                </button>

                <button className="watch-btn">

                  <span className="play-circle">
                    <Play size={15} fill="currentColor" />
                  </span>

                  Explore Workouts

                </button>

              </div>

              <div className="hero-stats">

                <div className="hero-stat">
                  <strong>50+</strong>
                  <span>Exercises</span>
                </div>

                <div className="stat-line"></div>

                <div className="hero-stat">
                  <strong>20+</strong>
                  <span>Workout Plans</span>
                </div>

                <div className="stat-line"></div>

                <div className="hero-stat">
                  <strong>24/7</strong>
                  <span>AI Guidance</span>
                </div>

              </div>

            </div>

            {/* HERO IMAGE */}

            <div className="hero-visual">

              <div className="hero-glow"></div>

              <div className="hero-image-wrapper">

                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=90"
                  alt="Fitness training"
                />

                <div className="floating-card calories-card">

                  <div className="floating-icon orange">
                    <Flame size={19} />
                  </div>

                  <div>
                    <span>Calories</span>
                    <strong>642 kcal</strong>
                  </div>

                </div>

                <div className="floating-card workout-card">

                  <div className="floating-icon green">
                    <CheckCircle size={19} />
                  </div>

                  <div>
                    <span>Today's Goal</span>
                    <strong>78% Complete</strong>
                  </div>

                </div>

              </div>

              <div className="hero-shape shape-one"></div>
              <div className="hero-shape shape-two"></div>

            </div>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="feature-strip">

          <div className="feature-container">

            <div className="feature-item">

              <div className="feature-icon">
                <Dumbbell size={23} />
              </div>

              <div>
                <strong>Smart Workouts</strong>
                <span>Personalized training plans</span>
              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                <Brain size={23} />
              </div>

              <div>
                <strong>AI Form Check</strong>
                <span>Real-time exercise guidance</span>
              </div>

            </div>

            <div className="feature-item">

              <div className="feature-icon">
                <Flame size={23} />
              </div>

              <div>
                <strong>Track Progress</strong>
                <span>See your fitness journey</span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= WORKOUTS ================= */}

        <section
          className="workouts-section"
          id="workouts"
        >

          <div className="section-container">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  TRAIN SMARTER
                </span>

                <h2>
                  Popular Workouts
                </h2>

                <p>
                  Choose a workout that fits your goal
                  and fitness level.
                </p>

              </div>

              <button className="view-all-btn">
                View All
                <ChevronRight size={18} />
              </button>

            </div>

            <div className="workout-grid">

              {workouts.map((workout, index) => (

                <article
                  className="workout-card"
                  key={index}
                >

                  <div className="workout-image">

                    <img
                      src={workout.image}
                      alt={workout.title}
                    />

                    <span
                      className={`level-tag level-${workout.level.toLowerCase()}`}
                    >
                      {workout.level}
                    </span>

                    <button className="image-play">
                      <Play
                        size={17}
                        fill="currentColor"
                      />
                    </button>

                  </div>

                  <div className="workout-content">

                    <h3>
                      {workout.title}
                    </h3>

                    <div className="workout-meta">

                      <span>
                        <Clock size={15} />
                        {workout.duration}
                      </span>

                      <span>
                        <Flame size={15} />
                        {workout.calories}
                      </span>

                    </div>

                    <button className="workout-start">

                      Start Workout

                      <ArrowRight size={16} />

                    </button>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* ================= WELLNESS ================= */}

        <section
          className="wellness-section"
          id="wellness"
        >

          <div className="section-container">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  FITNESS & WELLNESS
                </span>

                <h2>
                  Everything You Need
                </h2>

                <p>
                  Train your body, relax your mind,
                  and enjoy your fitness journey.
                </p>

              </div>

            </div>

            <div className="wellness-grid">

              {/* WORKOUT */}

              <div className="wellness-card workouts-main-card">

                <div className="wellness-card-content">

                  <span className="wellness-icon">
                    🏋️
                  </span>

                  <span className="section-label">
                    TRAIN
                  </span>

                  <h3>
                    Workouts
                  </h3>

                  <p>
                    Personalized workouts for strength,
                    cardio, weight loss, and full-body fitness.
                  </p>

                  <button className="wellness-btn">
                    Explore Workouts
                    <ArrowRight size={15} />
                  </button>

                </div>

              </div>

              {/* YOGA */}

              <div className="wellness-card yoga-card">

                <div className="wellness-card-content">

                  <span className="wellness-icon">
                    🧘
                  </span>

                  <span className="section-label">
                    FLEXIBILITY
                  </span>

                  <h3>
                    Yoga
                  </h3>

                  <p>
                    Improve flexibility, balance, breathing,
                    and body control with guided yoga.
                  </p>

                  <button className="wellness-btn">
                    Explore Yoga
                    <ArrowRight size={15} />
                  </button>

                </div>

              </div>

              {/* MEDITATION */}

              <div className="wellness-card meditation-card">

                <div className="wellness-card-content">

                  <span className="wellness-icon">
                    🧘‍♂️
                  </span>

                  <span className="section-label">
                    RELAX
                  </span>

                  <h3>
                    Meditation
                  </h3>

                  <p>
                    Calm your mind with guided meditation,
                    breathing exercises, and relaxation.
                  </p>

                  <button className="wellness-btn">
                    Start Meditation
                    <ArrowRight size={15} />
                  </button>

                </div>

              </div>

              {/* MUSIC */}

              <div className="wellness-card music-card">

                <div className="wellness-card-content">

                  <span className="wellness-icon">
                    🎵
                  </span>

                  <span className="section-label">
                    ENERGY
                  </span>

                  <h3>
                    Music
                  </h3>

                  <p>
                    Listen to motivating playlists and
                    energetic music while you train.
                  </p>

                  <button className="wellness-btn">
                    Play Music
                    <Music size={15} />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= AI FORM CHECK ================= */}

        <section
          className="ai-section"
          id="ai-check"
        >

          <div className="ai-container">

            <div className="ai-content">

              <span className="section-label">
                AI FITNESS COACH
              </span>

              <h2>
                Train With
                <span> AI-Powered </span>
                Form Guidance
              </h2>

              <p>
                Your camera becomes your personal fitness coach.
                FITLIFE uses AI pose detection to analyze your
                exercise movements and help you improve your form
                in real time.
              </p>

              <div className="ai-features">

                <div className="ai-feature">
                  <CheckCircle size={19} />
                  Real-time posture analysis
                </div>

                <div className="ai-feature">
                  <CheckCircle size={19} />
                  Automatic rep counting
                </div>

                <div className="ai-feature">
                  <CheckCircle size={19} />
                  Form score & feedback
                </div>

                <div className="ai-feature">
                  <CheckCircle size={19} />
                  Exercise performance tracking
                </div>

              </div>

              <button className="ai-btn">
                Try AI Form Check
                <ArrowRight size={17} />
              </button>

            </div>

            <div className="ai-visual">

              <div className="ai-camera">

                <img
                  src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=90"
                  alt="AI exercise form"
                />

                <div className="camera-overlay"></div>

                <div className="pose-point point-1"></div>
                <div className="pose-point point-2"></div>
                <div className="pose-point point-3"></div>
                <div className="pose-point point-4"></div>
                <div className="pose-point point-5"></div>

                <div className="ai-score">

                  <span>
                    FORM SCORE
                  </span>

                  <strong>
                    94%
                  </strong>

                  <small>
                    Excellent form
                  </small>

                </div>

                <div className="ai-rep">

                  <span>
                    REPS
                  </span>

                  <strong>
                    12
                  </strong>

                </div>

                <div className="scan-line"></div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= NUTRITION ================= */}

        <section
          className="nutrition-section"
          id="nutrition"
        >

          <div className="nutrition-container">

            <div className="nutrition-icon">
              🍎
            </div>

            <div>

              <span className="section-label">
                EAT BETTER
              </span>

              <h2>
                Smart Nutrition
              </h2>

              <p>
                Discover healthy meals, nutrition tips,
                food habits, and personalized meal guidance.
              </p>

            </div>

            <button className="outline-btn">
              Explore Nutrition
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        {/* ================= PROGRESS ================= */}

        <section
          className="progress-section"
          id="progress"
        >

          <div className="section-container">

            <div className="progress-header">

              <div>

                <span className="section-label">
                  YOUR JOURNEY
                </span>

                <h2>
                  Track Your Progress
                </h2>

              </div>

              <button className="outline-btn">
                View Progress
                <ArrowRight size={17} />
              </button>

            </div>

            <div className="progress-grid">

              <div className="progress-card">

                <HeartPulse size={26} />

                <strong>
                  78%
                </strong>

                <span>
                  Weekly Goal
                </span>

              </div>

              <div className="progress-card">

                <Flame size={26} />

                <strong>
                  2,840
                </strong>

                <span>
                  Calories Burned
                </span>

              </div>

              <div className="progress-card">

                <Dumbbell size={26} />

                <strong>
                  18
                </strong>

                <span>
                  Workouts Completed
                </span>

              </div>

              <div className="progress-card">

                <CheckCircle size={26} />

                <strong>
                  12
                </strong>

                <span>
                  Day Streak
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ================= STORE ================= */}

        <section
          className="store-section"
          id="store"
        >

          <div className="store-container">

            <div>

              <span className="section-label">
                FITNESS STORE
              </span>

              <h2>
                Gear Up For Your Goals
              </h2>

              <p>
                Discover fitness equipment, accessories,
                workout essentials, and more.
              </p>

            </div>

            <button className="primary-btn">

              <ShoppingBag size={18} />

              Visit Store

              <ArrowRight size={17} />

            </button>

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="cta-section">

          <div className="cta-container">

            <div>

              <span className="section-label">
                YOUR JOURNEY STARTS HERE
              </span>

              <h2>
                Ready to become your best self?
              </h2>

              <p>
                Join FITLIFE and take control of your
                fitness and wellness.
              </p>

            </div>

            <button className="primary-btn">
              Get Started Free
              <ArrowRight size={18} />
            </button>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <div className="logo">

              <span className="logo-icon">
                <Dumbbell size={19} />
              </span>

              <span>
                FIT<span>LIFE</span>
              </span>

            </div>

            <p>
              AI-powered fitness and wellness for everyone.
            </p>

          </div>

          <div className="footer-links">

            <a href="#home">Home</a>
            <a href="#workouts">Workouts</a>
            <a href="#wellness">Yoga</a>
            <a href="#wellness">Meditation</a>
            <a href="#wellness">Music</a>
            <a href="#ai-check">AI Form Check</a>

          </div>

          <div className="footer-profile">

            <User size={15} />

            <span>
              FITLIFE
            </span>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 FITLIFE. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;