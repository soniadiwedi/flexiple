import React, { useState } from 'react';

const Note = ({ id, text, isPin, setPin, deleteNote, isEditing, editNote, cancelEdit, updateNoteText }) => {
  const [editedText, setEditedText] = useState(text);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleUpdateClick = () => {
    updateNoteText(editedText);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea value={editedText} onChange={handleTextChange} />
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p className="break-word">{text}</p>
          <button className='deletebtn' onClick={() => deleteNote(id)}>
            X
          </button>
          <button
            className="pinbtn"
            style={{
              backgroundColor: isPin ? 'grey' : 'green',
              color: 'white',
            }}
            onClick={() => setPin(id)}
          >
            {isPin ? 'Unpin' : 'Pin'}
          </button>
          <button className="editbtn" onClick={editNote}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Note;
