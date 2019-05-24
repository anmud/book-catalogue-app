import React  from 'react';
import AddNote from './AddNote'


function Notes({ books, setBooks, setToggleNotes, bookToNote, setBookToNote }) {



    return (
        <div>

            <AddNote
                books={books}
                setBooks={setBooks}
                setToggleNotes={setToggleNotes}
                bookToNote={bookToNote}
                setBookToNote={setBookToNote}
            />
       
          
            
        </div>
    );
}

export default Notes;
