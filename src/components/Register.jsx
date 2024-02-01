// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/register", { username, password })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => console.error("Registration error:", error));
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="username" style={labelStyle}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
  maxWidth: "400px",
  margin: "40px auto"
};

const headingStyle = {
  color: "#333",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const labelStyle = {
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  outlineColor: "#007BFF",
};

const buttonStyle = {
  padding: "10px",
  color: "#fff",
  backgroundColor: "#007BFF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default Register;
