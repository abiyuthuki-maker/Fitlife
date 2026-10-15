
import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  Camera,
  CheckCircle,
  Clock,
  Flame,
  Play,
  RotateCcw,
  Square,
  Target,
  Video,
} from "lucide-react";
import "./AIFormCheck.css";

function AIFormCheck() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [exercise, setExercise] = useState("Push Ups");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [reps, setReps] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [formScore, setFormScore] = useState(0);
  const [feedback, setFeedback] = useState(
    "Start your workout to see your form feedback."
  );
  const [cameraError, setCameraError] = useState("");

  // Workout timer
  useEffect(() => {
    if (!isTraining) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTraining]);

  // Start camera
  const startCamera = async () => {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera access requires HTTPS or localhost.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraOn(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraError(
        error.message ||
          "Unable to access camera. Please check your camera permission."
      );
    }
  };

  // Stop camera
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOn(false);
  };

  // Connect camera stream to video
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOn]);

  // Clean up camera when leaving the page
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startWorkout = () => {
    setIsTraining(true);
    setFeedback("Workout started! Keep your movements controlled.");
  };

  const stopWorkout = () => {
    setIsTraining(false);
    setFeedback("Workout paused. Review your form and continue when ready.");
  };

  const resetWorkout = () => {
    setIsTraining(false);
    setReps(0);
    setSeconds(0);
    setFormScore(0);
    setFeedback("Ready! Start your workout when you are prepared.");
  };

  // Demo controls for testing the interface.
  // Replace these with real pose-detection results later.
  const simulateRep = () => {
    if (!isTraining) return;

    setReps((previous) => previous + 1);
    setFormScore(94);
    setFeedback("Good job! Keep your back straight and move with control.");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calories = Math.round(seconds / 60 * 6);

  return (
    <main className="ai-form-page">
      {/* Navbar */}
      <nav className="ai-navbar">
        <a href="/" className="ai-logo">
          <Activity size={28} />
          <span>FIT<span className="ai-accent">LIFE</span></span>
        </a>

        <div className="ai-nav-links">
          <a href="/">Home</a>
          <a href="/wellness">Wellness</a>
          <a href="/ai-form-check" className="active">
            AI Form Check
          </a>
          <a href="/nutrition">Nutrition</a>
          <a href="/progress">Progress</a>
        </div>
      </nav>

      {/* Page heading */}
      <section className="ai-heading">
        <span className="ai-eyebrow">
          <Activity size={16} /> SMART FITNESS TECHNOLOGY
        </span>

        <h1>
          Perfect Your Form.
          <br />
          <span>Build Your Strength.</span>
        </h1>

        <p>
          Train smarter with your workout camera, session tracking,
          and exercise guidance.
        </p>
      </section>

      {/* Main dashboard */}
      <section className="ai-dashboard">
        <div className="ai-camera-card">
          <div className="ai-card-heading">
            <div>
              <h2>Live Form Check</h2>
              <p>Position your full body in the camera frame.</p>
            </div>

            <span className={`ai-status ${isCameraOn ? "online" : ""}`}>
              <span className="ai-status-dot" />
              {isCameraOn ? "Camera On" : "Camera Off"}
            </span>
          </div>

          <div className="ai-video-container">
            {isCameraOn ? (
              <video
                ref={videoRef}
                className="ai-video"
                autoPlay
                playsInline
                muted
              />
            ) : (
              <div className="ai-camera-placeholder">
                <div className="ai-camera-icon">
                  <Camera size={42} />
                </div>
                <h3>Your Workout Camera</h3>
                <p>Enable your camera to see your live video.</p>
                <button
                  className="ai-primary-button"
                  onClick={startCamera}
                >
                  <Video size={18} /> Enable Camera
                </button>
              </div>
            )}

            {isCameraOn && (
              <div className="ai-camera-overlay">
                <span><span className="ai-status-dot" /> LIVE</span>
                <span>{exercise}</span>
              </div>
            )}
          </div>

          {cameraError && (
            <p className="ai-error">{cameraError}</p>
          )}

          <div className="ai-camera-actions">
            {!isCameraOn ? (
              <button
                className="ai-primary-button"
                onClick={startCamera}
              >
                <Camera size={18} /> Start Camera
              </button>
            ) : (
              <button
                className="ai-secondary-button"
                onClick={stopCamera}
              >
                <Square size={16} /> Stop Camera
              </button>
            )}

            <button
              className="ai-secondary-button"
              onClick={resetWorkout}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          <div className="ai-tip">
            <Target size={21} />
            <div>
              <strong>Training tip</strong>
              <p>
                Keep your movements controlled and stop if you feel pain.
              </p>
            </div>
          </div>
        </div>

        {/* Workout controls */}
        <div className="ai-side-panel">
          <div className="ai-panel-card">
            <h2>Choose Exercise</h2>
            <p className="ai-muted">Select your workout activity.</p>

            <div className="ai-exercise-list">
              {["Push Ups", "Squats", "Plank", "Jumping Jacks", "Lunges"].map(
                (item) => (
                  <button
                    key={item}
                    className={`ai-exercise-option ${
                      exercise === item ? "selected" : ""
                    }`}
                    onClick={() => {
                      setExercise(item);
                      setFeedback(`Selected ${item}. Get ready to train.`);
                    }}
                  >
                    <span className="ai-exercise-symbol">
                      <Activity size={20} />
                    </span>
                    <span>{item}</span>
                    {exercise === item && (
                      <CheckCircle size={19} className="ai-check" />
                    )}
                  </button>
                )
              )}
            </div>

            <div className="ai-workout-buttons">
              {!isTraining ? (
                <button
                  className="ai-primary-button ai-full-button"
                  onClick={startWorkout}
                >
                  <Play size={18} fill="currentColor" /> Start Workout
                </button>
              ) : (
                <button
                  className="ai-secondary-button ai-full-button"
                  onClick={stopWorkout}
                >
                  <Square size={16} /> Pause Workout
                </button>
              )}
            </div>
          </div>

          <div className="ai-panel-card">
            <h2>Workout Statistics</h2>

            <div className="ai-stats-grid">
              <div className="ai-stat-box">
                <Target size={22} />
                <span>Repetitions</span>
                <strong>{reps}</strong>
              </div>

              <div className="ai-stat-box">
                <Clock size={22} />
                <span>Duration</span>
                <strong>{formatTime(seconds)}</strong>
              </div>

              <div className="ai-stat-box">
                <Flame size={22} />
                <span>Est. Calories</span>
                <strong>{calories}</strong>
              </div>

              <div className="ai-stat-box">
                <Activity size={22} />
                <span>Form Score</span>
                <strong>{formScore}%</strong>
              </div>
            </div>

            <div className="ai-feedback">
              <div className="ai-feedback-title">
                <CheckCircle size={20} />
                <strong>Workout Feedback</strong>
              </div>
              <p>{feedback}</p>
            </div>

            <button
              className="ai-secondary-button ai-full-button"
              onClick={simulateRep}
              disabled={!isTraining}
              title="Demo only: this button does not detect real repetitions"
            >
              + Add Demo Rep
            </button>
          </div>
        </div>
      </section>

      <footer className="ai-footer">
        <Activity size={20} />
        <span>FITLIFE — Train Smart. Live Strong.</span>
      </footer>
    </main>
  );
}

export default AIFormCheck;
