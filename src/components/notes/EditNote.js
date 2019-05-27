import React from 'react';
import { history } from "../../App"


function EditNote({ bookToNote, currentNote, setCurrentNote,  updateCurrentNote, setToggleNotes }) {

    const handleChange = event => {
        const { name, value } = event.target
        return setCurrentNote({ ...currentNote, [name]: value })
    }


    return (
        <div>

            <h2>Edit note</h2>

            <div>

                <form onSubmit={event => {
                    event.preventDefault()
                    updateCurrentNote({currentNote: currentNote, notes: bookToNote.notes})
                }}>

                    <div>

                        {bookToNote.currentDate} - {bookToNote.currentTime}
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
                        value={currentNote.noteAutor}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Your note: </label>
                    <textarea name="content" value={currentNote.content}
                        onChange={handleChange} />

                    <br />
                    <label>Book page number: </label>
                    <input
                        type="text"
                        name="bookPage"
                        value={currentNote.bookPage}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Update</button>
                    <button onClick={() => {
                        setToggleNotes(false)
                        history.goBack()
                    }}>Cancel</button>
                </form>
           
            </div>
      
            <pre>{JSON.stringify(currentNote, null, 4)}</pre>

        </div>
    );
}

export default EditNote;