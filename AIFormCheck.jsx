
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Play,
  Square,
  RotateCcw,
  Activity,
  Flame,
  Clock,
  CheckCircle,
  Dumbbell,
} from "lucide-react";
import "./AIFormCheck.css";

function AIFormCheck() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const [exercise, setExercise] = useState("Squats");
  const [cameraOn, setCameraOn] = useState(false);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [reps, setReps] = useState(0);
  const [formScore, setFormScore] = useState(0);
  const [message, setMessage] = useState(
    "Start your camera to begin your workout."
  );
  const [error, setError] = useState("");

  const exercises = [
    "Squats",
    "Push Ups",
    "Lunges",
    "Jumping Jacks",
    "Plank",
  ];

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera is unavailable. Use localhost or HTTPS."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);
      setMessage("Camera connected. Ready to start!");
    } catch (err) {
      setError(
        err.name === "NotAllowedError"
          ? "Camera permission denied. Allow camera access in your browser."
          : err.message || "Unable to access your camera."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    stopWorkout();
    setMessage("Camera stopped.");
  };

  const startWorkout = () => {
    if (!cameraOn) {
      setError("Please start the camera first.");
      return;
    }

    setError("");
    setRunning(true);
    setMessage("Workout started! Follow the exercise instructions.");

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);
  };

  const stopWorkout = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const resetWorkout = () => {
    stopWorkout();
    setSeconds(0);
    setReps(0);
    setFormScore(0);
    setMessage("Workout reset. Ready to start again.");
    setError("");
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calories = Math.round(seconds / 60 * 5);

  return (
    <div className="ai-check-page">
      <header className="ai-header">
        <a href="/" className="ai-logo">
          <Activity size={27} />
          <span>FIT<span>LIFE</span></span>
        </a>

        <a href="/" className="ai-home-link">
          Back to Home
        </a>
      </header>

      <main className="ai-main">
        <section className="ai-heading">
          <span className="ai-tag">
            <Activity size={15} /> AI FITNESS TECHNOLOGY
          </span>

          <h1>
            AI Form <span>Check</span>
          </h1>

          <p>
            Train smarter, improve your posture, and build a
            healthier lifestyle with FITLIFE.
          </p>
        </section>

        <section className="ai-workspace">
          <div className="ai-camera-card">
            <div className="ai-camera-top">
              <div>
                <h2>Live Workout Camera</h2>
                <p>Position your full body in the camera frame.</p>
              </div>

              <span className={cameraOn ? "ai-status live" : "ai-status"}>
                <span className="ai-status-dot" />
                {cameraOn ? "Camera On" : "Camera Off"}
              </span>
            </div>

            <div className="ai-video-container">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={cameraOn ? "ai-video" : "ai-video hidden"}
              />

              {!cameraOn && (
                <div className="ai-camera-placeholder">
                  <div className="ai-camera-icon">
                    <Camera size={40} />
                  </div>
                  <h3>Your workout starts here</h3>
                  <p>Enable your camera to see yourself.</p>
                </div>
              )}

              {cameraOn && (
                <div className="ai-camera-overlay">
                  <span className="ai-record-dot" />
                  CAMERA ACTIVE
                </div>
              )}
            </div>

            {error && <p className="ai-error">{error}</p>}

            <div className="ai-camera-actions">
              {!cameraOn ? (
                <button
                  className="ai-btn ai-btn-primary"
                  onClick={startCamera}
                >
                  <Camera size={18} /> Enable Camera
                </button>
              ) : (
                <button
                  className="ai-btn ai-btn-secondary"
                  onClick={stopCamera}
                >
                  <CameraOff size={18} /> Stop Camera
                </button>
              )}

              {!running ? (
                <button
                  className="ai-btn ai-btn-primary"
                  onClick={startWorkout}
                >
                  <Play size={18} /> Start Workout
                </button>
              ) : (
                <button
                  className="ai-btn ai-btn-secondary"
                  onClick={stopWorkout}
                >
                  <Square size={17} /> Finish Workout
                </button>
              )}

              <button
                className="ai-reset-btn"
                onClick={resetWorkout}
                aria-label="Reset workout"
                title="Reset workout"
              >
                <RotateCcw size={19} />
              </button>
            </div>

            <p className="ai-message">
              <CheckCircle size={17} /> {message}
            </p>
          </div>

          <aside className="ai-sidebar">
            <div className="ai-panel">
              <h2><Dumbbell size={20} /> Select Exercise</h2>

              <div className="ai-exercise-list">
                {exercises.map((item) => (
                  <button
                    key={item}
                    className={
                      exercise === item
                        ? "ai-exercise selected"
                        : "ai-exercise"
                    }
                    onClick={() => {
                      setExercise(item);
                      setMessage(`${item} selected. Ready to train.`);
                    }}
                  >
                    <span>{item}</span>
                    {exercise === item && (
                      <CheckCircle size={18} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-panel ai-stats-panel">
              <h2><Activity size={20} /> Workout Statistics</h2>

              <div className="ai-stat">
                <span className="ai-stat-icon"><Dumbbell size={20} /></span>
                <div>
                  <p>Repetitions</p>
                  <strong>{reps}</strong>
                </div>
              </div>

              <div className="ai-stat">
                <span className="ai-stat-icon"><CheckCircle size={20} /></span>
                <div>
                  <p>Form Score</p>
                  <strong>{formScore}%</strong>
                </div>
              </div>

              <div className="ai-stat">
                <span className="ai-stat-icon"><Clock size={20} /></span>
                <div>
                  <p>Duration</p>
                  <strong>{formatTime(seconds)}</strong>
                </div>
              </div>

              <div className="ai-stat">
                <span className="ai-stat-icon"><Flame size={20} /></span>
                <div>
                  <p>Estimated Calories</p>
                  <strong>{calories} kcal</strong>
                </div>
              </div>
            </div>

            <div className="ai-tip">
              <h3>💡 Fitness Tip</h3>
              <p>
                {exercise === "Squats"
                  ? "Keep your chest up and knees aligned with your toes."
                  : exercise === "Push Ups"
                  ? "Keep your body straight and your core engaged."
                  : exercise === "Lunges"
                  ? "Keep your balance and avoid letting your front knee collapse inward."
                  : exercise === "Jumping Jacks"
                  ? "Land softly and maintain a steady rhythm."
                  : "Keep your body aligned and breathe normally."}
              </p>
            </div>
          </aside>
        </section>

        <p className="ai-disclaimer">
          Note: This starter version accesses your camera but does not
          yet detect body posture or count real repetitions. AI-based
          scoring requires pose-detection integration.
        </p>
      </main>
    </div>
  );
}

export default AIFormCheck;

