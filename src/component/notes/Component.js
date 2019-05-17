import React  from 'react';
import NotesContainer from './NotesContainer'


function Notes({ books, allNotes, setAllNotes }) {

    const updateNotes = (note) => {
        note.id = allNotes.length + 1
        return setAllNotes([...allNotes, note])
    }

    // console.log("all notes", allNotes)

    return (
        <div>

            <NotesContainer
                books={books}
                updateNotes={updateNotes}
            />

            <div>
                <div>
                    {
                        allNotes.map(note => <p key={note.id}>{note.bookTitle}:  {note.note}</p>)
                    }
                </div>


            </div>

        </div>
    );
}

export default Notes;
