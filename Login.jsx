
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

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
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Backend returned HTML instead of JSON. Check your API URL and backend routes."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token) {
        throw new Error(
          "Login succeeded, but the backend did not return a JWT token."
        );
      }

      // Save the JWT token.
      localStorage.setItem("fitlife-token", data.token);

      if (data.user) {
        localStorage.setItem(
          "fitlife-user",
          JSON.stringify(data.user)
        );
      }

      // Open the requested page, or Wellness by default.
      const requestedPath = location.state?.from?.pathname;

      const destination =
        requestedPath &&
        requestedPath.startsWith("/") &&
        !requestedPath.startsWith("//") &&
        requestedPath !== "/login"
          ? requestedPath
          : "/wellness";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to backend. Make sure your server is running on port 5000."
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
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p role="alert" style={styles.message}>
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
    boxSizing: "border-box",
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
    boxSizing: "border-box",
    width: "100%",
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
    color: "#ff8585",
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
