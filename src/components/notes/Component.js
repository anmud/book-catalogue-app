import React  from 'react';
import NotesContainer from './NotesContainer'


function Notes({ books, setBooks, setToggleNotes, bookToNote, setBookToNote }) {



    return (
        <div>

            <NotesContainer
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
