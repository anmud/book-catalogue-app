import React from 'react';
import API, {graphqlOperation} from '@aws-amplify/api'


function NotesList({ books, setBooks,  bookToNote, setBookToNote, editNote}) {


  const filteredBook = books.filter(book => bookToNote.id === book.id)

  const notes = filteredBook.length > 0 ? filteredBook[0].notes : []

 
   const deleteNote = async ({ id }) => {
    const filteredNotes = bookToNote.notes.filter(note => note.noteId !== id)
    setBookToNote({...bookToNote, notes: [...filteredNotes] }) 
    await API.graphql(graphqlOperation(`
    mutation deleteNote {
      deleteNote(input:{
        bookId: ${JSON.stringify(bookToNote.id)}
        noteId: ${JSON.stringify(id)}
      })
    }
    `))
    setBooks(books.map(book => book.id === bookToNote.id ? ({...book, notes: [...filteredNotes] }) : book))
   }


    return (
        <div>
   <h2>"{bookToNote.title}" - Notes</h2>
        <div>
             <table>
                <thead>
                  <tr>
                    <th>Note Author</th>
                    <th>Page number</th>
                    <th>Note</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                { notes.length >= 0 ?
                    ( notes.map(note => 
                    (<tr key={note.noteId}>
                    <td>{note.noteAuthor}</td>
                    <td>{note.bookPage}</td>
                    <td>{note.content}</td>
                    <td>{note.date}</td>
                    <td>
                      <button onClick={() => editNote(note)}>Edit</button>
                      <button onClick={() => deleteNote({id: note.noteId})}>Delete</button>
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
