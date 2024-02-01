import React, { useState } from "react";

const TodoItem = ({ task, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? task.dueDate.substring(0, 10) : ""
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdateTask(
      task._id,
      editedTitle,
      editedDescription,
      task.done,
      editedPriority,
      editedDueDate
    );
    setIsEditing(false);
  };

  const handleToggleDone = () => {
    onUpdateTask(
      task._id,
      task.title,
      task.description,
      !task.done,
      task.priority,
      task.dueDate
    );
  };

  return (
    <div style={itemStyle}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggleDone}
        style={checkboxStyle}
      />
      {isEditing ? (
        <div style={editContainerStyle}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            style={inputStyle}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleUpdate} style={buttonStyle}>
            Update
          </button>
        </div>
      ) : (
        <div style={infoStyle}>
          <div>
            <strong>{task.title}: </strong>
            {task.description} <br />
            <strong>Priority:</strong> {task.priority}<br />
            <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}
          </div>
          <button onClick={handleEdit} style={editButtonStyle}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const itemStyle = {
  background: "#f4f4f4",
  padding: "10px",
  borderBottom: "1px #ccc dotted",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginBottom: "10px",
};

const checkboxStyle = {
  marginRight: "10px",
};

const editContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
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

const infoStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const editButtonStyle = {
  marginLeft: "10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "5px",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default TodoItem;
