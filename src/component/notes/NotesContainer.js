import React, {useState}  from 'react';


function NotesContainer({books, updateNotes}) {
  
    const [note, setNote] = useState({
        
        id: 0,
        bookTitle: '',
        note: "",
    
    })
    
    const handleChange = event => {
    const {name, value} = event.target
    setNote({...note, [name]: value})
    }
    

   
  return (
    <div>
     
     <h2>Notes for the book</h2>

          <div>
              
                <form onSubmit={event => {
                    event.preventDefault()
                    updateNotes(note)
                }}>

                <label>The book: </label>
                <select
                    value={note.bookTitle}
                    onChange={handleChange}
                    name="bookTitle">
                    {
                        books.map(book => <option key={book.id} value={book.title}> {book.title}</option>)
                    }
                </select>


                <textarea name="note" value={note.note}
                    onChange={handleChange} />

                <button>Submit</button>

            </form>

          </div>
        
    </div>
  );
}

export default NotesContainer;