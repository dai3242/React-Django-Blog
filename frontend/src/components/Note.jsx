import React from "react";
import "../styles/Note.css";

const Note = ({ note, onDelete }) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Date(note.created_at)
    .toLocaleString("ja-JP", options)
    .replace(/\//g, "-")
    .replace(/ /, " ");

  return (
    <div className="note-container">
      <p className="note-title">Title: {note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-data">Created at {formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};

export default Note;
