import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/MyNotes.css";

const MyNotes = (props) => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container" {...props}>
      <article>
        <div className="user-input">
          <h2>Add a Note</h2>
          <form className="note-form" onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div className="note-box">
          <h2>My Notes</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Note</th>
                <th scope="col">Content</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default MyNotes;
