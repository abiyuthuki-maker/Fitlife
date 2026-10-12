/*import React, { useState } from "react";
import "./AIFormCheck.css";

import {
  Camera,
  CameraOff,
  Dumbbell,
  Clock,
  Flame,
  RotateCcw,
  Play,
  Pause,
  Plus,
  CheckCircle,
  Activity,
} from "lucide-react";

import "./AIFormCheck.css";

const exercises = [
  { name: "Push-ups", target: 12, caloriesPerRep: 0.5 },
  { name: "Squats", target: 15, caloriesPerRep: 0.4 },
  { name: "Lunges", target: 12, caloriesPerRep: 0.4 },
  { name: "Plank", target: 1, caloriesPerRep: 0 },
];

export default function AIFormCheck() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const [exercise, setExercise] = useState("Push-ups");
  const [reps, setReps] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const selectedExercise = exercises.find(
    (item) => item.name === exercise
  );

  // Camera start
  const startCamera = async () => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Camera is unavailable. Use localhost or HTTPS."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);
    } catch (error) {
      setCameraError(
        "Camera access failed. Allow camera permission in your browser."
      );
    }
  };

  // Camera stop
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  };

  // Timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((previous) => previous + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Cleanup camera when leaving page
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const changeExercise = (event) => {
    setExercise(event.target.value);
    setReps(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const resetWorkout = () => {
    setReps(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const addRep = () => {
    setReps((previous) => previous + 1);
  };

  const calories = Math.round(
    reps * selectedExercise.caloriesPerRep
  );

  const progress = Math.min(
    (reps / selectedExercise.target) * 100,
    100
  );

  return (
    <main className="ai-page">
      <header className="ai-header">
        <a href="/" className="ai-logo">
          <Dumbbell size={26} />
          <span>FIT<span>LIFE</span></span>
        </a>

        <div className="ai-header-label">
          <Activity size={18} />
          AI FORM CHECK
        </div>

        <a href="/" className="ai-back-link">
          Back to Home
        </a>
      </header>

      <section className="ai-intro">
        <p className="ai-eyebrow">SMART WORKOUT TRACKER</p>
        <h1>Train Smarter. <span>Move Better.</span></h1>
        <p>
          Track your workout, count your reps, and monitor your
          training time in one place.
        </p>
      </section>

      <section className="ai-layout">
        {/* Camera panel */}
        <div className="ai-camera-card">
          <div className="ai-card-heading">
            <div>
              <h2>Live Camera</h2>
              <p>Position yourself in front of the camera.</p>
            </div>

            <span className={cameraOn ? "ai-status live" : "ai-status"}>
              {cameraOn ? "CAMERA ON" : "CAMERA OFF"}
            </span>
          </div>

          <div className="ai-video-area">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
            />

            {!cameraOn && (
              <div className="ai-camera-placeholder">
                <Camera size={48} />
                <h3>Camera Preview</h3>
                <p>Enable your camera to see yourself.</p>
              </div>
            )}

            {cameraOn && (
              <div className="ai-camera-badge">
                <span /> Camera active
              </div>
            )}
          </div>

          {cameraError && (
            <p className="ai-error">{cameraError}</p>
          )}

          <div className="ai-camera-actions">
            {!cameraOn ? (
              <button className="ai-primary-btn" onClick={startCamera}>
                <Camera size={18} />
                Enable Camera
              </button>
            ) : (
              <button className="ai-secondary-btn" onClick={stopCamera}>
                <CameraOff size={18} />
                Stop Camera
              </button>
            )}
          </div>

          <p className="ai-disclaimer">
            Camera access requires your permission. This version
            does not automatically analyse exercise posture.
          </p>
        </div>

        {/* Workout panel */}
        <div className="ai-workout-card">
          <div className="ai-card-heading">
            <div>
              <h2>Workout Session</h2>
              <p>Choose an exercise to get started.</p>
            </div>
            <Dumbbell className="ai-green-icon" size={24} />
          </div>

          <label className="ai-label" htmlFor="exercise">
            Select Exercise
          </label>

          <select
            id="exercise"
            className="ai-select"
            value={exercise}
            onChange={changeExercise}
          >
            {exercises.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="ai-stats-grid">
            <div className="ai-stat">
              <Dumbbell size={21} />
              <p>Repetitions</p>
              <strong>{reps}</strong>
            </div>

            <div className="ai-stat">
              <Clock size={21} />
              <p>Duration</p>
              <strong>{formatTime(seconds)}</strong>
            </div>

            <div className="ai-stat">
              <Flame size={21} />
              <p>Est. Calories</p>
              <strong>{calories}</strong>
            </div>
          </div>

          <div className="ai-progress-heading">
            <span>Rep Goal</span>
            <strong>
              {reps} / {selectedExercise.target}
            </strong>
          </div>

          <div
            className="ai-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="ai-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {progress >= 100 && (
            <p className="ai-goal-message">
              <CheckCircle size={17} />
              Rep goal reached!
            </p>
          )}

          <div className="ai-workout-actions">
            <button
              className="ai-primary-btn"
              onClick={() => setIsRunning((previous) => !previous)}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              {isRunning ? "Pause Timer" : "Start Timer"}
            </button>

            <button className="ai-secondary-btn" onClick={addRep}>
              <Plus size={18} />
              Add Rep
            </button>

            <button
              className="ai-reset-btn"
              onClick={resetWorkout}
              aria-label="Reset workout"
              title="Reset workout"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <p className="ai-disclaimer">
            Rep counting is manual in this demo. Calories are rough
            estimates, not measured values.
          </p>
        </div>
      </section>

      <footer className="ai-footer">
        FITLIFE · Your fitness journey starts here.
      </footer>
    </main>
  );
}

