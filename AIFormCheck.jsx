
import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import {
  Activity,
  Camera,
  Mic,
  Play,
  Square,
  RotateCcw,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";

const CONNECTIONS = [
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [27, 29], [29, 31], [27, 31],
  [24, 26], [26, 28], [28, 30], [30, 32], [28, 32],
  [0, 11], [0, 12],
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#07110d",
    color: "#f4f7f4",
    padding: "28px",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box",
  },
  panel: {
    background: "#101c16",
    border: "1px solid #26382c",
    borderRadius: "18px",
    padding: "22px",
    minWidth: 0,
  },
  button: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #34473a",
    background: "#a7f23d",
    color: "#101a0e",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondary: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #34473a",
    background: "#18271d",
    color: "#f4f7f4",
    fontWeight: 600,
    cursor: "pointer",
  },
};

function getAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let degrees = Math.abs((radians * 180) / Math.PI);
  if (degrees > 180) degrees = 360 - degrees;

  return degrees;
}

export default function AIFormCheck() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const lastSpeechRef = useRef(0);
  const lastFeedbackRef = useRef("");
  const phaseRef = useRef("up");
  const repsRef = useRef(0);
  const runningRef = useRef(false);
  const processingRef = useRef(false);

  const [exercise, setExercise] = useState("Squats");
  const [cameraOn, setCameraOn] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [training, setTraining] = useState(false);
  const [reps, setReps] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [position, setPosition] = useState("Camera not started");
  const [feedback, setFeedback] = useState(
    "Start your camera and stand where your body is visible."
  );
  const [score, setScore] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [error, setError] = useState("");
  const [landmarksVisible, setLandmarksVisible] = useState(false);

  // Voice feedback
  const speak = (message, force = false) => {
    if (!voiceOn || !("speechSynthesis" in window)) return;

    const now = Date.now();

    if (
      !force &&
      (message === lastFeedbackRef.current ||
        now - lastSpeechRef.current < 3500)
    ) {
      return;
    }

    lastSpeechRef.current = now;
    lastFeedbackRef.current = message;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const updateFeedback = (message, forceVoice = false) => {
    setFeedback(message);
    speak(message, forceVoice);
  };

  // Release camera and AI resources
  const stopCamera = () => {
    runningRef.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) videoRef.current.srcObject = null;

    modelRef.current?.close();
    modelRef.current = null;

    setCameraOn(false);
    setModelReady(false);
    setTraining(false);
    setPosition("Camera stopped");
    setLandmarksVisible(false);
  };

  // Start webcam and load MediaPipe model
  const startCamera = async () => {
    try {
      setError("");
      setPosition("Loading camera...");
      setFeedback("Please wait while the AI model loads.");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera access requires localhost or HTTPS.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();

      setCameraOn(true);
      setPosition("Loading AI pose model...");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );

      if (!runningRef.current && streamRef.current !== stream) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const model = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      modelRef.current = model;
      runningRef.current = true;

      setModelReady(true);
      setPosition("AI ready — position your body");
      updateFeedback(
        "AI camera is ready. Make sure your body is visible.",
        true
      );

      detectPose();
    } catch (err) {
      setError(
        err.message ||
          "Unable to start the camera or load the AI model."
      );
      setPosition("Camera or AI unavailable");
      stopCamera();
    }
  };

  // Calculate posture and exercise repetitions from detected landmarks
  const analysePose = (landmarks) => {
    const visible = (index) =>
      landmarks[index] &&
      (landmarks[index].visibility ?? 1) > 0.55;

    const required = exercise === "Squats"
      ? [11, 12, 23, 24, 25, 26, 27, 28]
      : [11, 12, 13, 14, 15, 16, 23, 24];

    const visibleCount = required.filter(visible).length;

    if (visibleCount < required.length * 0.75) {
      setPosition("Move back — show your full body");
      setLandmarksVisible(false);
      setScore(0);
      updateFeedback("Move back and make your body clearly visible.");
      return;
    }

    setLandmarksVisible(true);
    setPosition("Body detected — analysing movement");

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    const hip = {
      x: (leftHip.x + rightHip.x) / 2,
      y: (leftHip.y + rightHip.y) / 2,
    };

    const shoulder = {
      x: (leftShoulder.x + rightShoulder.x) / 2,
      y: (leftShoulder.y + rightShoulder.y) / 2,
    };

    // Squat: track hip-knee-ankle angle.
    // Push-up: track shoulder-elbow-wrist angle.
    const a = exercise === "Squats"
      ? landmarks[23]
      : landmarks[11];

    const b = exercise === "Squats"
      ? landmarks[25]
      : landmarks[13];

    const c = exercise === "Squats"
      ? landmarks[27]
      : landmarks[15];

    const angle = getAngle(a, b, c);

    let goodForm = true;
    let message = "Good form! Keep going.";

    if (exercise === "Squats") {
      const torsoLean =
        Math.abs(shoulder.x - hip.x) /
        Math.max(Math.abs(hip.y - shoulder.y), 0.01);

      if (angle < 100) {
        phaseRef.current = "down";
        message = "Good depth. Now stand up.";
      } else if (angle > 155 && phaseRef.current === "down") {
        phaseRef.current = "up";
        repsRef.current += 1;
        setReps(repsRef.current);
        message = `Great squat! ${repsRef.current} repetitions.`;
      } else if (angle > 155) {
        message = "Ready. Bend your knees and lower down.";
      }

      if (torsoLean > 1.1) {
        goodForm = false;
        message = "Keep your chest up and control your movement.";
      }
    } else if (exercise === "Push Ups") {
      if (angle < 95) {
        phaseRef.current = "down";
        message = "Good. Push back up.";
      } else if (angle > 155 && phaseRef.current === "down") {
        phaseRef.current = "up";
        repsRef.current += 1;
        setReps(repsRef.current);
        message = `Good push-up! ${repsRef.current} repetitions.`;
      } else if (angle > 155) {
        message = "Lower your body with control.";
      }
    } else {
      message =
        "Live pose detected. Automatic rep counting is currently configured for squats and push-ups.";
    }

    setScore(goodForm ? 95 : 70);
    setPosition(`Body detected — joint angle ${Math.round(angle)}°`);

    if (message !== lastFeedbackRef.current) {
      updateFeedback(message);
    }
  };

  // Real-time pose detection loop
  const detectPose = () => {
    if (!runningRef.current || !modelRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const model = modelRef.current;

    if (
      !video ||
      !canvas ||
      video.readyState < 2 ||
      processingRef.current
    ) {
      animationRef.current = requestAnimationFrame(detectPose);
      return;
    }

    processingRef.current = true;

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const result = model.detectForVideo(video, performance.now());
      const landmarks = result.landmarks?.[0];

      if (landmarks) {
        // Draw detected body skeleton
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#a7f23d";
        ctx.fillStyle = "#ffffff";

        CONNECTIONS.forEach(([start, end]) => {
          const first = landmarks[start];
          const second = landmarks[end];

          if (
            (first.visibility ?? 1) < 0.4 ||
            (second.visibility ?? 1) < 0.4
          ) {
            return;
          }

          ctx.beginPath();
          ctx.moveTo(first.x * canvas.width, first.y * canvas.height);
          ctx.lineTo(second.x * canvas.width, second.y * canvas.height);
          ctx.stroke();
        });

        landmarks.forEach((point) => {
          if ((point.visibility ?? 1) < 0.4) return;

          ctx.beginPath();
          ctx.arc(
            point.x * canvas.width,
            point.y * canvas.height,
            4,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        if (training) analysePose(landmarks);
      } else {
        setPosition("No body detected — adjust your position");
        setLandmarksVisible(false);
        setScore(0);
        updateFeedback("I cannot see your body. Move into the camera frame.");
      }
    } catch (err) {
      console.error("Pose detection error:", err);
    } finally {
      processingRef.current = false;
    }

    animationRef.current = requestAnimationFrame(detectPose);
  };

  // Workout duration
  useEffect(() => {
    if (!training) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [training]);

  // Update exercise analysis when selection changes
  useEffect(() => {
    phaseRef.current = "up";
    repsRef.current = 0;
    setReps(0);
    setScore(0);
    setFeedback(`Selected ${exercise}. Start your workout when ready.`);
  }, [exercise]);

  useEffect(() => {
    return () => {
      runningRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      modelRef.current?.close();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const resetWorkout = () => {
    setTraining(false);
    repsRef.current = 0;
    phaseRef.current = "up";
    setReps(0);
    setSeconds(0);
    setScore(0);
    updateFeedback("Workout reset. Get ready to start again.", true);
  };

  const formatTime = (value) =>
    `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
      value % 60
    ).padStart(2, "0")}`;

  const startWorkout = () => {
    if (!modelReady) {
      setError("Start the camera and wait for the AI model first.");
      return;
    }

    setError("");
    setTraining(true);
    updateFeedback("Workout started. Move slowly and focus on your form.", true);
  };

  const stopWorkout = () => {
    setTraining(false);
    updateFeedback("Workout paused. Rest and review your form.", true);
  };

  return (
    <main style={styles.page}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 36,
        }}
      >
        <a
          href="/"
          style={{
            color: "#a7f23d",
            textDecoration: "none",
            fontWeight: 900,
            fontSize: 24,
          }}
        >
          <Activity size={25} style={{ verticalAlign: "middle" }} /> FITLIFE
        </a>

        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/" style={{ color: "#c1cdc4" }}>Home</a>
          <a href="/wellness" style={{ color: "#c1cdc4" }}>Wellness</a>
          <a href="/nutrition" style={{ color: "#c1cdc4" }}>Nutrition</a>
          <a href="/progress" style={{ color: "#c1cdc4" }}>Progress</a>
        </nav>
      </header>

      <section style={{ marginBottom: 30 }}>
        <p style={{ color: "#a7f23d", fontWeight: 700 }}>
          SMART AI FITNESS COACH
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 48px)", margin: "12px 0" }}>
          Perfect your form.{" "}
          <span style={{ color: "#a7f23d" }}>Get stronger.</span>
        </h1>
        <p style={{ color: "#a8b5aa", lineHeight: 1.7 }}>
          Real-time pose detection, exercise counting, posture feedback,
          and a voice coach.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: 22,
          alignItems: "start",
        }}
      >
        {/* Camera and skeleton */}
        <div style={styles.panel}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <h2 style={{ margin: 0 }}>Live AI Camera</h2>
            <span style={{ color: modelReady ? "#a7f23d" : "#b8c2bb" }}>
              ● {modelReady ? "AI READY" : "AI NOT READY"}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 14,
              background: "#030705",
              aspectRatio: "16 / 10",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scaleX(-1)",
                display: cameraOn ? "block" : "none",
              }}
            />

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
                transform: "scaleX(-1)",
                pointerEvents: "none",
              }}
            />

            {!cameraOn && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeContent: "center",
                  textAlign: "center",
                  color: "#a7b4a9",
                  padding: 20,
                }}
              >
                <Camera size={44} style={{ margin: "0 auto 14px" }} />
                <h3>Camera Preview</h3>
                <p>Enable your camera to detect your body.</p>
              </div>
            )}
          </div>

          <p style={{ color: "#a7f23d", fontSize: 14 }}>
            ● {position}
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {!cameraOn ? (
              <button style={styles.button} onClick={startCamera}>
                <Camera size={17} /> Start AI Camera
              </button>
            ) : (
              <button style={styles.secondary} onClick={stopCamera}>
                <Camera size={17} /> Stop Camera
              </button>
            )}

            {!training ? (
              <button
                style={styles.button}
                onClick={startWorkout}
                disabled={!modelReady}
              >
                <Play size={17} /> Start Workout
              </button>
            ) : (
              <button style={styles.secondary} onClick={stopWorkout}>
                <Square size={16} /> Pause
              </button>
            )}

            <button style={styles.secondary} onClick={resetWorkout}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {error && (
            <p style={{ color: "#ff8b8b", overflowWrap: "anywhere" }}>
              {error}
            </p>
          )}
        </div>

        {/* Exercise and feedback */}
        <div style={{ display: "grid", gap: 22 }}>
          <div style={styles.panel}>
            <h2 style={{ marginTop: 0 }}>Choose Exercise</h2>

            <select
              value={exercise}
              onChange={(event) => setExercise(event.target.value)}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 10,
                background: "#07110d",
                border: "1px solid #34473a",
                color: "white",
                fontSize: 16,
              }}
            >
              <option>Squats</option>
              <option>Push Ups</option>
              <option>Plank</option>
              <option>Jumping Jacks</option>
              <option>Lunges</option>
            </select>

            <p style={{ color: "#a8b5aa", lineHeight: 1.6 }}>
              Automatic repetition counting is configured for squats and
              push-ups. Other selections still display detected body landmarks,
              but need their own movement-counting logic.
            </p>
          </div>

          <div style={styles.panel}>
            <h2 style={{ marginTop: 0 }}>Workout Analysis</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {[
                [Target, "Repetitions", reps],
                [Clock, "Duration", formatTime(seconds)],
                [CheckCircle, "Form indicator", `${score}%`],
                [Activity, "Pose detection", landmarksVisible ? "Active" : "Waiting"],
              ].map(([Icon, label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "#18271d",
                    padding: 16,
                    borderRadius: 12,
                  }}
                >
                  <Icon color="#a7f23d" size={22} />
                  <p style={{ color: "#a8b5aa", fontSize: 13 }}>{label}</p>
                  <strong style={{ fontSize: 23 }}>{value}</strong>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#18271d",
                borderRadius: 12,
                padding: 16,
                marginTop: 18,
              }}
            >
              <h3 style={{ color: "#a7f23d", marginTop: 0 }}>
                AI Coach Feedback
              </h3>
              <p style={{ lineHeight: 1.7 }}>{feedback}</p>

              <button
                style={styles.secondary}
                onClick={() => {
                  setVoiceOn((previous) => {
                    const next = !previous;

                    if (!next && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }

                    return next;
                  });
                }}
              >
                <Mic size={17} /> Voice: {voiceOn ? "ON" : "OFF"}
              </button>

              <button
                style={{ ...styles.secondary, marginLeft: 8 }}
                onClick={() => speak(feedback, true)}
                disabled={!voiceOn}
              >
                Speak Feedback
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "28px 0 8px",
          color: "#a8b5aa",
          textAlign: "center",
        }}
      >
        FITLIFE — Train Smart. Live Strong.
      </footer>
    </main>
  );
}
