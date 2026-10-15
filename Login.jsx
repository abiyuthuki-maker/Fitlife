
import React from "react";

function Login() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* One Fitness Image Only */}
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

        <form style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

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

  footer: {
    color: "#a7f23d",
    marginTop: "22px",
    fontSize: "13px",
  },
};

export default Login;
