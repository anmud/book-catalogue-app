import React, {useState} from 'react';


function NotesContainer({books, setBooks, setToggleNotes, bookToNote,}) {

    const handleChange = event => {
    const {name, value} = event.target
    setNewNote({...newNote, [name]: value})
    }
    

    const  [newNote, setNewNote] = useState({
        noteId: 0, 
        noteAuthor: "",
        bookTitle: bookToNote.title, 
        content: "", 
        bookPage: 0,
        date: bookToNote.currentDate,
        time: bookToNote.currentTime
      })


const addNewNote = ({newNote, bookToNote}) => {
    console.log(bookToNote)
    
    const newNoteWId = {...newNote, noteId: bookToNote.notes.length + 1}
    console.log(newNoteWId)
     return setBooks(books.map(book => book.id === bookToNote.id ? console.log(([...book.notes, newNoteWId])) || ({...book, notes: [...book.notes, newNoteWId] }) : book))
}


  return (
    <div>
     
     <h2>Notes for the book</h2>

          <div>
                
              <form onSubmit={event => {
                  event.preventDefault( )
                  setNewNote(newNote)
                  addNewNote({newNote: newNote, bookToNote: bookToNote, books: books})
                 
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
<pre>{JSON.stringify(bookToNote, null, 4)}</pre>
          </div>

        
    </div>
  );
}

export default NotesContainer;