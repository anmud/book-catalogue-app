import React, {useState} from 'react';
import {history} from '../../App'
import EditNote from './EditNote';


function NotesList({books, bookToNote, setBookToNote, setToggleNotes}) {

 const filteredBook =  books.filter(book => bookToNote.id === book.id)

 const notes = filteredBook.length > 0 ? filteredBook[0].notes : []


const [toggleNoteEdit, setNoteEdit] = useState(false)

 const [currentNote, setCurrentNote]= useState({
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
                      <button >Delete</button>
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
              <button onClick={() => {
                history.goBack()
                setToggleNotes(false)
              }}>Back to catalogue</button>
        </div>



     { toggleNoteEdit ? (
       <div>
       <EditNote
       currentNote={currentNote}
       setCurrentNote={setCurrentNote}
       toggleNoteEdit={toggleNoteEdit}
       setNoteEdit={setNoteEdit}
       notes={notes}
       books={books}
       bookToNote={bookToNote}
       setBookToNote={setBookToNote}
       />
     </div>
     ) : (
       console.log("Page is not found")
     )
    }
      
       
       </div> 
    );
}

export default NotesList;
