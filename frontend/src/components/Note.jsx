import React from "react";
import "../styles/Note.css";

const Note = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <tr>
      <td>{note.title}</td>
      <td className="note-content">{note.content}</td>
      <td className="note-date">{formattedDate}</td>
      <td className="delete-button-cell">
        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Note;
