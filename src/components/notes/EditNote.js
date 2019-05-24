import React, { useState } from 'react';
import { history } from "../../App"


function EditNote({ books, setBooks, bookToNote,setBookToNote, currentNote, setCurrentNote, toggleNoteEdit, setNoteEdit, notes }) {

    const handleChange = event => {
        const { name, value } = event.target
        return setCurrentNote({ ...currentNote, [name]: value })
    }


    const updateCurrentNote = ({ currentNote, notes }) => {
        setNoteEdit(false)
        console.log("current note", currentNote)
        console.log("notes", notes)
       
    const updatedNotes =  notes.map(note => note.noteId === currentNote.noteId 
        ? currentNote
        : note
        ) 
      console.log("updated notes", updatedNotes)
      setBookToNote({ ...bookToNote, notes: [...bookToNote.notes, updatedNotes] })
      console.log('book to note with updated notes', bookToNote)
     // return setBooks(books.map(book => book.id === bookToNote.id ? ({ ...book, notes: [...book.notes, newNoteWId] }) : book))
     }


    return (
        <div>

            <h2>Edit note</h2>

            <div>

                <form onSubmit={event => {
                    event.preventDefault()
                    updateCurrentNote({currentNote: currentNote, notes: notes})
                }}>

                    <div>

                        {bookToNote.currentDate} - {bookToNote.currentTime}
                    </div>
                    <br />
                    <div>
                        <label>Book: </label>
                        <p>{bookToNote.title}</p>
                    </div>
                    <br />
                    <label>Note author: </label>
                    <input
                        type="text"
                        name="noteAuthor"
                        value={currentNote.noteAutor}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Your note: </label>
                    <textarea name="content" value={currentNote.content}
                        onChange={handleChange} />

                    <br />
                    <label>Book page number: </label>
                    <input
                        type="text"
                        name="bookPage"
                        value={currentNote.bookPage}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Update</button>
                    <button onClick={() => {
                        // setToggleNotes(false)
                        // history.goBack()
                    }}>Cancel</button>
                </form>
           
            </div>


        </div>
    );
}

export default EditNote;