import React, { useState } from "react";
import axios from "axios";

const NewTaskForm = ({ onTaskCreated }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 0,
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/tasks",
        newTask,
        { withCredentials: true }
      );
      onTaskCreated(response.data);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Task Title"
        style={inputStyle}
      />
      <input
        type="text"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Task Description"
        style={inputStyle}
      />
      <input
        type="number"
        name="priority"
        value={newTask.priority}
        onChange={handleInputChange}
        placeholder="Priority"
      />
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleInputChange}
        placeholder="Due Date"
      />
      {error && <p style={errorStyle}>{error}</p>}

      <button type="submit" style={buttonStyle}>
        Add Task
      </button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
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

export default NewTaskForm;
