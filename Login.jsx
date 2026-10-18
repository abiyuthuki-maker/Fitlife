
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
  throw new Error(data.message || "Login failed");
}

if (!data.token) {
  throw new Error("JWT token was not returned");
}

localStorage.setItem("fitlife-token", data.token);

if (data.user) {
  localStorage.setItem(
    "fitlife-user",
    JSON.stringify(data.user)
  );
}

navigate("/wellness");
  } catch (error) {
    setMessage(
      error.message === "Failed to fetch"
        ? "Backend connection failed."
        : error.message
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&auto=format&fit=crop"
          alt="Fitness Gym"
          style={styles.image}
        />

        <h1 style={styles.title}>
          FIT<span style={{ color: "#a7f23d" }}>LIFE</span>
        </h1>

        <p style={styles.subtitle}>
          Welcome Back! Start Your Fitness Journey.
        </p>

        <form style={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p role="status" style={styles.message}>
            {message}
          </p>
        )}

        <p style={styles.footer}>
          Your Fitness. Your Future.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07110d",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "25px",
    backgroundColor: "#101c16",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.4)",
  },

  image: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    borderRadius: "14px",
  },

  title: {
    color: "#ffffff",
    fontSize: "32px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#b8c4bb",
    fontSize: "14px",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #34453a",
    backgroundColor: "#19271f",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    padding: "14px",
    backgroundColor: "#a7f23d",
    color: "#07110d",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  message: {
    color: "#a7f23d",
    fontSize: "13px",
    marginTop: "15px",
    overflowWrap: "anywhere",
  },

  footer: {
    color: "#a7f23d",
    marginTop: "22px",
    fontSize: "13px",
  },
};

export default Login;
