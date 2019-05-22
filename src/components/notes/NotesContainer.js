import React, {useState} from 'react';


// default assignment
// if d is not proived as an argument to a function use the value aufter the equal sign "="
const currentDate = (d = new Date()) => 
  d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


// default assignment
// if d is not proived as an argument to a function use the value aufter the equal sign "="
const currentTime = (d = new Date()) =>
("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2)


function NotesContainer({books, setBooks, setToggleNotes, bookToNote, setBookToNote}) {

    const handleChange = event => {
    const {name, value} = event.target
       return setNewNote({...newNote, [name]: value})
    }
    
    const  [newNote, setNewNote] = useState({
        noteId: 0, 
        noteAuthor: "", 
        content: "", 
        bookPage: 0,
        date: "",
        time: ""
      })


    const addNewNote = ({newNote, bookToNote, setBookToNote}) => {
    const newNoteWId = {...newNote, noteId: bookToNote.notes.length + 1, date: currentDate(), time: currentTime()}
    setNewNote({ 
        noteId: 0, 
        noteAuthor: "",
        content: "", 
        bookPage: 0,
        date: "",
        time: ""
    })
        setBookToNote({...bookToNote, notes: [...bookToNote.notes, newNoteWId]})
     return setBooks(books.map(book => book.id === bookToNote.id ?  ({...book, notes: [...book.notes, newNoteWId] }) : book))
}


  return (
    <div>
     
     <h2>Notes for the book</h2>

          <div>
                
              <form onSubmit={event => {
                  event.preventDefault()
                  setNewNote(newNote)
                  addNewNote({newNote: newNote, bookToNote: bookToNote, setBookToNote: setBookToNote,books: books, setNewNote: setNewNote})
              }}>

                  <div>

                     {bookToNote.currentDate} - {bookToNote.currentTime}
                  </div>
                   <br/>
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
                  <button onClick={() => setToggleNotes(false)}>Cancel</button>
              </form>
<pre>{JSON.stringify(newNote, null, 4)}</pre>
          </div>

        
    </div>
  );
}

export default NotesContainer;