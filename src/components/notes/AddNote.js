import React, { useState } from 'react';
import { history } from "../../App"
import API, {graphqlOperation} from "@aws-amplify/api"


// default assignment
// if d is not proived as an argument to a function use the value aufter the equal sign "="
const currentDate = (d = new Date()) =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


function AddNote({ books, setBooks, setToggleNotes, bookToNote, setBookToNote }) {

    const handleChange = event => {
        const { name, value } = event.target
        return setNewNote({ ...newNote, [name]: value })
    }

    const [newNote, setNewNote] = useState({
        noteId: "",
        bookId: "",
        noteAuthor: "",
        content: "",
        bookPage: 0,
        date: "",
    })


    const addNewNote = async ({ newNote, bookToNote, setBookToNote }) => {
        const newNoteWId = { ...newNote,  date: currentDate()}
        setNewNote({
            noteId: "",
            bookId: "",
            noteAuthor: "",
            content: "",
            bookPage: 0,
            date: "",
        }) 
     const {data}  =  await API.graphql(graphqlOperation(`
        mutation addNote {
            addNote(input: {
              bookId: ${JSON.stringify(bookToNote.id)}
              noteAuthor: ${JSON.stringify(newNoteWId.noteAuthor)}
              content: ${JSON.stringify(newNoteWId.content)}
              bookPage: ${newNoteWId.bookPage}
            }) {
                noteId
                noteAuthor
                date
                content
                bookPage
              }
          }
          `))
          console.log("add note data", data)
      
        setBookToNote({ ...bookToNote, notes: [...data.addNote] })
        setBooks(books.map(book => book.id === bookToNote.id ?  ({ ...book, notes: [...data.addNote] })  : book))
       }



    return (
        <div>

            <h2>Add Note</h2>

            <div>

                <form onSubmit={event => {
                    event.preventDefault()
                    setNewNote(newNote)
                    addNewNote({ newNote: newNote, bookToNote: bookToNote, setBookToNote: setBookToNote, books: books, setNewNote: setNewNote })
                }}>

                    <div>

                        {bookToNote.currentDate} 
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
                        value={newNote.noteAutor}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Your note: </label>
                    <textarea name="content" value={newNote.content}
                        onChange={handleChange} />

                    <br />
                    <label>Book page number: </label>
                    <input
                        type="text"
                        name="bookPage"
                        value={newNote.bookPage}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Add</button>
                    <button onClick={() => {
                        setToggleNotes(false)
                        history.goBack()
                    }}>Cancel</button>
                </form>
           
            </div>


        </div>
    );
}

export default AddNote;