import React, {useState}  from 'react';
import NotesContainer from './NotesContainer'



function Notes({books}) {
  
    const [allNotes, setAllNotes] = useState([
        {
            id: 1,
            bookTitle: 'The Titan',
            note: "The most informative book",
        }
    ])

    const updateNotes = (note) => {
     note.id = allNotes.length + 1
     return setAllNotes([...allNotes, note])
    }

    console.log("all notes", allNotes)
    
  return (
      <div>

          <NotesContainer
          books={books}
          updateNotes={updateNotes}
          />

      </div>
  );
}

export default Notes;
