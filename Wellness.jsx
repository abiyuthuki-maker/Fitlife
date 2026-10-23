
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Dumbbell,
  HeartPulse,
  Brain,
  Music,
  Play,
  Clock,
  Flame,
  ArrowRight,
} from "lucide-react";

import "./Wellness.css";

function Wellness() {
  const [activeTab, setActiveTab] = useState("All");
  const [authChecked, setAuthChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Read the token using the supported storage keys.
  const getToken = () => {
    return (
      localStorage.getItem("fitlife-token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("fitlifeToken") ||
      localStorage.getItem("fitlife_token")
    );
  };

  // Prevent access when no login token exists.
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
      return;
    }

    setAuthChecked(true);
  }, [navigate, location]);

  const openFitnessVideo = (item) => {
    navigate("/fitness-video", {
      state: {
        title: item.title,
        category: item.category,
        level: item.level,
        duration: item.duration,
        info: item.info,
        image: item.image,
      },
    });
  };

  const activities = [
    {
      category: "Workouts",
      title: "Full Body Workout",
      level: "Beginner",
      duration: "20 min",
      info: "180 kcal",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Workouts",
      title: "Strength Training",
      level: "Intermediate",
      duration: "30 min",
      info: "260 kcal",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Yoga",
      title: "Morning Yoga",
      level: "Beginner",
      duration: "15 min",
      info: "70 kcal",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Yoga",
      title: "Power Yoga",
      level: "Intermediate",
      duration: "30 min",
      info: "150 kcal",
      image:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Meditation",
      title: "Stress Relief",
      level: "Beginner",
      duration: "10 min",
      info: "Relax",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Meditation",
      title: "Deep Relaxation",
      level: "Beginner",
      duration: "20 min",
      info: "Relax",
      image:
        "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Music",
      title: "Workout Energy",
      level: "Playlist",
      duration: "45 min",
      info: "Energy",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    },
    {
      category: "Music",
      title: "Relaxing Music",
      level: "Playlist",
      duration: "60 min",
      info: "Relax",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredActivities =
    activeTab === "All"
      ? activities
      : activities.filter(
          (item) => item.category === activeTab
        );

  // Do not display the page before checking the token.
  if (!authChecked) {
    return null;
  }

  return (
    <div className="wellness-page">
      {/* HEADER */}
      <header className="wellness-header">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={20} />
          </span>
          FIT<span>LIFE</span>
        </Link>

        <div className="wellness-title">
          <span>FITLIFE WELLNESS</span>

          <h1>
            Move. Relax.
            <br />
            <strong>Live Better.</strong>
          </h1>

          <p>
            Workouts, Yoga, Meditation and Music —
            everything you need for a healthier lifestyle.
          </p>
        </div>
      </header>

      {/* CATEGORY MENU */}
      <section className="wellness-menu">
        <button
          type="button"
          className={activeTab === "Workouts" ? "active" : ""}
          onClick={() => setActiveTab("Workouts")}
        >
          <Dumbbell />
          <div>
            <strong>Workouts</strong>
            <small>Build Strength</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "Yoga" ? "active" : ""}
          onClick={() => setActiveTab("Yoga")}
        >
          <HeartPulse />
          <div>
            <strong>Yoga</strong>
            <small>Flexibility &amp; Balance</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "Meditation" ? "active" : ""}
          onClick={() => setActiveTab("Meditation")}
        >
          <Brain />
          <div>
            <strong>Meditation</strong>
            <small>Calm Your Mind</small>
          </div>
        </button>

        <button
          type="button"
          className={activeTab === "Music" ? "active" : ""}
          onClick={() => setActiveTab("Music")}
        >
          <Music />
          <div>
            <strong>Music</strong>
            <small>Stay Motivated</small>
          </div>
        </button>
      </section>

      {/* FILTER */}
      <div className="wellness-filter">
        {["All", "Workouts", "Yoga", "Meditation", "Music"].map(
          (tab) => (
            <button
              type="button"
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* ACTIVITY CARDS */}
      <section className="wellness-grid">
        {filteredActivities.map((item) => (
          <div className="wellness-card" key={item.title}>
            <div className="wellness-card-image">
              <img src={item.image} alt={item.title} />

              <span className="wellness-category">
                {item.category}
              </span>

              <button
                type="button"
                className="wellness-play"
                onClick={() => openFitnessVideo(item)}
                aria-label={`Play ${item.title}`}
              >
                <Play size={18} fill="currentColor" />
              </button>
            </div>

            <div className="wellness-card-content">
              <span className="wellness-level">
                {item.level}
              </span>

              <h2>{item.title}</h2>

              <div className="wellness-info">
                <span>
                  <Clock size={15} />
                  {item.duration}
                </span>

                <span>
                  <Flame size={15} />
                  {item.info}
                </span>
              </div>

              <button
                type="button"
                className="start-button"
                onClick={() => openFitnessVideo(item)}
              >
                Start Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* BACK HOME */}
      <div className="wellness-bottom">
        <Link to="/" className="secondary-button">
          <ArrowRight
            size={17}
            style={{ transform: "rotate(180deg)" }}
          />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Wellness;
