import React from 'react';



function NotesList({ books, setBooks,  bookToNote, setBookToNote, editNote}) {


  const filteredBook = books.filter(book => bookToNote.id === book.id)

  const notes = filteredBook.length > 0 ? filteredBook[0].notes : []

  const deleteNote = ({  notes, id }) => {
    const filteredNotes = bookToNote.notes.filter(note => note.noteId !== id)
    console.log('filtered', filteredNotes)
     setBookToNote({...bookToNote, notes: [...filteredNotes] }) 
     console.log("book", bookToNote)
     return  setBooks(books.map(book => book.id === bookToNote.id ? ({...book, notes: [...filteredNotes] }) : book))

   }


    return (
        <div>

        <div>
             <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Note Author</th>
                    <th>Book title</th>
                    <th>Page number</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                { notes.length >= 0 ?
                    ( notes.map(note => 
                    (<tr key={note.noteId}>
                    <td>{note.noteId}</td>
                    <td>{note.noteAuthor}</td>
                    <td>{note.bookTitle}</td>
                    <td>{note.bookPage}</td>
                    <td>{note.content}</td>
                    <td>{note.date}</td>
                    <td>{note.time}</td>
                    <td>
                      <button onClick={() => editNote(note)}>Edit</button>
                      <button onClick={() => deleteNote({id: note.noteId, notes: notes})}>Delete</button>
                    </td>
                  </tr>
                    ))
                    ) : (
                        <tr>
                            <td>No notes</td>
                        </tr>
                    )
                   }
                </tbody>
              </table>
              <br/>
              <br/>
        </div>

       
       </div> 
    );
}

export default NotesList;
