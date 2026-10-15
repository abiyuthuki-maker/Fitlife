
import React, { useState } from "react";
import {
  Dumbbell,
  Play,
  Clock,
  Flame,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import "./FitnessVideo.css";

const workouts = [
  {
    title: "Full Body Workout",
    level: "Beginner",
    duration: "20 min",
    calories: "180 kcal",
    videoId: "UBMk30rjy0o",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    description:
      "A beginner-friendly full body workout to improve strength and fitness.",
    exercises: [
      "Jumping Jacks",
      "Bodyweight Squats",
      "Push Ups",
      "Plank",
    ],
  },
  {
    title: "Strength Training",
    level: "Intermediate",
    duration: "30 min",
    calories: "260 kcal",
    videoId: "IODxDxX7oi4",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    description:
      "Build strength with a guided bodyweight workout.",
    exercises: [
      "Push Ups",
      "Squats",
      "Lunges",
      "Plank",
    ],
  },
  {
    title: "Morning Yoga",
    level: "Beginner",
    duration: "15 min",
    calories: "70 kcal",
    videoId: "v7AYKMP6rOE",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    description:
      "Start your day with gentle yoga and stretching.",
    exercises: [
      "Mountain Pose",
      "Cat-Cow Stretch",
      "Downward Dog",
      "Child's Pose",
    ],
  },
];

function FitnessVideo() {
  const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]);
  const [completed, setCompleted] = useState([]);

  const toggleExercise = (exercise) => {
    setCompleted((previous) =>
      previous.includes(exercise)
        ? previous.filter((item) => item !== exercise)
        : [...previous, exercise]
    );
  };

  return (
    <div className="fitness-video-page">
      {/* NAVBAR */}
      <nav className="fitness-video-navbar">
        <a href="/" className="fitness-video-logo">
          <Dumbbell size={25} />
          FIT<span>LIFE</span>
        </a>

        <a href="/wellness" className="fitness-back-link">
          <ArrowLeft size={18} />
          Back to Wellness
        </a>
      </nav>

      {/* PAGE HEADER */}
      <header className="fitness-video-heading">
        <span className="fitness-eyebrow">
          FITLIFE TRAINING CENTER
        </span>

        <h1>
          Train Better. <span>Live Stronger.</span>
        </h1>

        <p>
          Follow guided workouts and build healthy habits
          at your own pace.
        </p>
      </header>

      <main className="fitness-video-layout">
        {/* VIDEO PLAYER */}
        <section className="fitness-main-content">
          <div className="fitness-player">
            <iframe
              key={selectedWorkout.videoId}
              src={`https://www.youtube.com/embed/${selectedWorkout.videoId}`}
              title={selectedWorkout.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="fitness-video-details">
            <span className="fitness-level-badge">
              {selectedWorkout.level}
            </span>

            <h2>{selectedWorkout.title}</h2>

            <p>{selectedWorkout.description}</p>

            <div className="fitness-video-stats">
              <span>
                <Clock size={18} />
                {selectedWorkout.duration}
              </span>

              <span>
                <Flame size={18} />
                {selectedWorkout.calories}
              </span>
            </div>
          </div>

          {/* EXERCISE CHECKLIST */}
          <div className="fitness-exercise-panel">
            <div className="fitness-section-title">
              <h3>Workout Checklist</h3>
              <span>
                {completed.filter((exercise) =>
                  selectedWorkout.exercises.includes(exercise)
                ).length} / {selectedWorkout.exercises.length} completed
              </span>
            </div>

            <div className="fitness-exercise-list">
              {selectedWorkout.exercises.map((exercise) => (
                <label
                  key={exercise}
                  className="fitness-exercise-item"
                >
                  <input
                    type="checkbox"
                    checked={completed.includes(exercise)}
                    onChange={() => toggleExercise(exercise)}
                  />

                  <span>{exercise}</span>

                  {completed.includes(exercise) && (
                    <CheckCircle size={19} />
                  )}
                </label>
              ))}
            </div>

            {selectedWorkout.exercises.every((exercise) =>
              completed.includes(exercise)
            ) && (
              <p className="fitness-success-message">
                Great job! You completed this workout checklist.
              </p>
            )}
          </div>
        </section>

        {/* WORKOUT SELECTION */}
        <aside className="fitness-workout-sidebar">
          <h3>Choose Your Workout</h3>
          <p className="fitness-sidebar-description">
            Select a workout to start training.
          </p>

          {workouts.map((workout) => (
            <button
              type="button"
              key={workout.title}
              className={`fitness-workout-option ${
                selectedWorkout.title === workout.title
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedWorkout(workout)}
            >
              <img src={workout.image} alt="" />

              <span className="fitness-option-content">
                <strong>{workout.title}</strong>

                <small>{workout.level}</small>

                <small>
                  <Clock size={13} />
                  {workout.duration}
                </small>
              </span>

              <span className="fitness-option-play">
                <Play size={16} fill="currentColor" />
              </span>
            </button>
          ))}

          <div className="fitness-tip">
            <strong>FITLIFE TIP</strong>
            <p>
              Warm up before exercising, drink enough water,
              and rest whenever you need to.
            </p>
          </div>
        </aside>
      </main>

      <footer className="fitness-video-footer">
        FITLIFE — Your fitness journey starts here.
      </footer>
    </div>
  );
}

export default FitnessVideo;
