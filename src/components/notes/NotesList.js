import React from 'react';



function NotesList({books, bookToNote}) {

 const filteredBook =  books.filter(book => bookToNote.id === book.id)

 const notes = filteredBook.length > 0 ? filteredBook[0].notes : []

 

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
                { notes.length > 0 ?
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
                      <button >Edit</button>
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
        </div>

       
       </div> 
    );
}

export default NotesList;
