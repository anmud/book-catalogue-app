import React, {useState}  from 'react';
import AddNote from './AddNote'
import NotesList from './NotesList'
import EditNote from './EditNote'
import {history} from '../../App'



function Notes({ books, setBooks, setToggleNotes, bookToNote, setBookToNote }) {
     
    const [toggleNoteEdit, setNoteEdit] = useState(false)

    const [currentNote, setCurrentNote] = useState({
        noteId: 0,
        noteAuthor: "",
        content: "",
        bookPage: 0,
        date: "",
        time: ""
    })

    const editNote = note => {
        setNoteEdit(true)
        return setCurrentNote({
            ...currentNote,
            noteId: note.noteId,
            noteAuthor: note.noteAutor,
            content: note.content,
            bookPage: note.bookPage,
            date: note.date,
            time: note.time
        })
    }

    const updateCurrentNote = ({ currentNote, notes }) => {
        setNoteEdit(false)
        const updatedNotes = notes.map(note => note.noteId === currentNote.noteId ? currentNote : note)
        setBookToNote({ ...bookToNote, notes: [...updatedNotes] })
        return setBooks(books.map(book => book.id === bookToNote.id ? ({...book, notes: [...updatedNotes] }) : book))
    }

    return (
        <div>

       <div>
            <NotesList
            books={books}
            setBooks={setBooks}
            bookToNote={bookToNote}
            setBookToNote={setBookToNote}
            setToggleNotes={setToggleNotes}
            editNote={editNote}
            />
      </div>
      <div>
     { toggleNoteEdit ? (
       <div>
           <EditNote
           currentNote={currentNote}
           setCurrentNote={setCurrentNote}
           bookToNote={bookToNote}
           updateCurrentNote={updateCurrentNote}
           setToggleNotes={setToggleNotes}
           />
     </div>
     ) : (
       <div>
           <AddNote
            books={books}
            setBooks={setBooks}
            setToggleNotes={setToggleNotes}
            bookToNote={bookToNote}
            setBookToNote={setBookToNote}
            />
        </div>
     )
    }
    </div>   
    <br/>
    <br/>
    <button onClick={() => {
                history.goBack()
                setToggleNotes(false)
              }}>Back to catalogue</button>



        </div>
    );
}

export default Notes;
