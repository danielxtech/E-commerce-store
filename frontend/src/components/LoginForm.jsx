// frontend/src/components/LoginForm.jsx

import React, { useState } from "react";
import { login } from "../api";

function LoginForm({ onLogin }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({ usernameOrEmail, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "350px",
        margin: "40px auto",
        padding: "25px",
        borderRadius: "20px",
        background: "linear-gradient(145deg, #a1c4fd, #c2e9fb)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        transition: "all 0.4s ease",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <input
        type="text"
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        required
        style={{
          padding: "12px 15px",
          borderRadius: "12px",
          border: "2px solid #6a11cb",
          outline: "none",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#ff6b6b")}
        onBlur={(e) => (e.target.style.borderColor = "#6a11cb")}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          padding: "12px 15px",
          borderRadius: "12px",
          border: "2px solid #6a11cb",
          outline: "none",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#ff6b6b")}
        onBlur={(e) => (e.target.style.borderColor = "#6a11cb")}
      />

      {/* ✅ Real login submit button (restored) */}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px 0",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#2f312f",
          border: "none",
          borderRadius: "15px",
          cursor: loading ? "not-allowed" : "pointer",
          background: "linear-gradient(45deg, #e70b0b, #ff9a9e, #1c06e4)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => !loading && (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div style={{ textAlign: "center", color: "#555", fontWeight: "bold" }}>
        — or —
      </div>

      {/* 👀 Continue as Visitor (no auth) */}
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("token"); // ensure no token
          const viewer = { username: "Visitor", role: "viewer" };
          localStorage.setItem("user", JSON.stringify(viewer));
          onLogin(viewer);
        }}
        style={{
          padding: "12px 0",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#1d1b1bff",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          background: "linear-gradient(45deg, #3db307ff, #f3d008b4)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        👀 Continue as Visitor
      </button>

      {error && (
        <p style={{ color: "red", margin: 0, textAlign: "center", fontWeight: "bold" }}>
          {error}
        </p>
      )}
    </form>
  );
}

export default LoginForm;

