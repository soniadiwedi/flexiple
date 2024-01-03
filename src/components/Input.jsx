import React, { useState } from 'react'

const Input = ({saveNote,newNoteText,setNewNoteText}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
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
          <input
          className='inputbox'
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Type your note here..."
          />
          <button className="savebtn" type="submit">
            Save
          </button>
        </form>
      )}

    </>
  )
}

export default Input