// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      setIsAuthenticated(false);
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or password");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <p style={errorStyle}>{error}</p>}
        <label htmlFor="username" style={labelStyle}>
          Username:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <input
          style={inputStyle}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={buttonStyle} type="submit">
          Login
        </button>
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
  margin: "40px auto",
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

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginBottom: "20px",
};
export default Login;
