import React  from 'react';


function EditBook(props) {
  
    const { currentBook, setCurrentBook,  setEditing, updateBook } = props

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCurrentBook({ ...currentBook, [name]: value })
    }

  return (
      <div className="App">
          <h1>Update a book </h1>
          <form
              onSubmit={event => {
                  event.preventDefault();
                  updateBook({ currentBook: currentBook, id: currentBook.id })
              }}
          >
              <label>Author</label>
              <input type="text" name="author" value={currentBook.author} onChange={handleInputChange} />
              <br />

              <label>Title</label>
              <input type="text" name="title" value={currentBook.title} onChange={handleInputChange} />
              <br />

              <label>Collection</label>
              <input type="text" name="collection" value={currentBook.collection} onChange={handleInputChange} />
              <br />

              <label>Volume</label>
              <input type="text" name="volume" value={currentBook.volume} onChange={handleInputChange} />
              <br />

              <label>Series</label>
              <input type="text" name="series" value={currentBook.series} onChange={handleInputChange} />
              <br />

              <label>Year</label>
              <input type="text" name="year" value={currentBook.year} onChange={handleInputChange} />
              <br />

              <button> Update </button>
              <button onClick={() => setEditing(false)}> Cancel </button>
          </form>
          <hr />


      </div>
  );
}

export default EditBook;
