import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Todo App</h1>
      <nav style={navStyle}>
        <Link style={linkStyle} to="/">Home</Link>
        <span style={separatorStyle}>|</span>
        <Link style={linkStyle} to="/login">Login</Link>
        <span style={separatorStyle}>|</span>
        <Link style={linkStyle} to="/register">Register</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  background: "#007BFF",
  color: "#fff",
  textAlign: "center",
  padding: "10px 0",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const titleStyle = {
  margin: "0",
  fontSize: "1.8rem",
};

const navStyle = {
  marginTop: "10px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "5px 10px",
  transition: "background-color 0.3s",
};

const separatorStyle = {
  color: "#fff",
  margin: "0 10px",
};


export default Header;
