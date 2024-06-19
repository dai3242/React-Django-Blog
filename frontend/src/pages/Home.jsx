import React, { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(`data is ${data}`);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const getNote = () => {
  //   api
  //     .get("/api/notes/")
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setNotes(data);
  //       console.log(`data is ${data}`);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete note");
      })
      .catch((error) => alert(error));
    getNote();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to created note");
      })
      .then(() => getNote());
  };

  return (
    <div>
      <div>
        <h2 className="create-title">Create a New Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <input type="submit" value="Submit"></input>
        </form>
        <h2 className="list-title">Your Notes</h2>
        {[...notes].reverse().map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id}></Note>
        ))}
      </div>
    </div>
  );
};

export default Home;
