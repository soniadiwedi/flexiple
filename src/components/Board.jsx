import React, { useState, useEffect } from "react";
import Note from "./Note";

const Board = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [newNoteText, setNewNoteText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, seteditId] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const saveNote = () => {
    if (newNoteText.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: newNoteText,
      xAxis: 0,
      yAxis: 0,
      position: "absolute",
      isPin: false,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNewNoteText("");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDragStart = (e, id) => {
    const noteIndex = notes.findIndex((el) => el.id === id);
    const note = notes[noteIndex];

    e.dataTransfer.setData("text/plain", note.id);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedNoteId = e.dataTransfer.getData("text/plain");
    const dropX = e.clientX;
    const dropY = e.clientY;

    const updatedNotes = notes.map((note) => {
      if (!note.isPin && note.id.toString() === draggedNoteId) {
        return {
          ...note,
          xAxis: dropX,
          yAxis: dropY,
        };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const setPin = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        note.isPin = !note.isPin;
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editNote = (id) => {
    seteditId(id);
    
  };

  const cancelEdit = () => {
    seteditId(null);
  };

  const updateNoteText = (id, newText) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          text: newText,
        };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    seteditId(null);
  };

  return (
    <div>
      <button
        style={{
          cursor: showForm ? "not-allowed" : "pointer",
          opacity: showForm ? 0.5 : 1,
          padding: "15px",
          position: "absolute",
          right: 0,
          top: 0,
          color: "white",
          backgroundColor: "red",
          fontSize: "30px",
          border: "none",
        }}
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>
      {showForm && (
        <form
          className="addForm"
          onSubmit={(e) => {
            e.preventDefault();
            saveNote();
          }}
        >
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Type your note here..."
          />
          <button className="savebtn" type="submit">
            Save
          </button>
        </form>
      )}

      <div
        className="maindiv"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        
      >
        {notes.map((el) => (
          <div
            key={el.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, el.id)}
            style={{
              border: "black",
              backgroundColor: "yellow",
              padding: "2rem",
              position: el.position,
              top: `${el.yAxis}px`,
              left: `${el.xAxis}px`,
            }}
          >
            <Note
              {...el}
              setPin={setPin}
              deleteNote={deleteNote}
              isEditing={editId === el.id}
              editNote={() => editNote(el.id)}
              cancelEdit={cancelEdit}
              updateNoteText={(newText) => updateNoteText(el.id, newText)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
