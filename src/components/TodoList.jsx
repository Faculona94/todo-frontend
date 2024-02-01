import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import TodoItem from "./TodoItem";
import NewTaskForm from "./NewTask";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    fetchTasks();

    socket.on("task-updated", () => {
      fetchTasks();
    });

    socket.on("task-added", (newTask) => {
      setTasks((currentTasks) => [...currentTasks, newTask]);
    });

    return () => {
      socket.off("task-updated");
      socket.off("newTaskCreated");
      socket.disconnect();
    };
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/todo/tasks", {
        withCredentials: true,
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleUpdateTask = (id, title, description, done) => {
    axios
      .put(
        `http://localhost:3000/todo/tasks/${id}`,
        { title, description, done },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div style={listStyle}>
      <h2 style={headingStyle}>Todo List</h2>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
      <div style={tasksContainerStyle}>
        {" "}
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            onUpdateTask={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  );
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
  maxWidth: "600px",
  margin: "40px auto"
};

const headingStyle = {
  color: "#333",
  textAlign: "center",
  marginBottom: "20px",
};

const tasksContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export default TodoList;
