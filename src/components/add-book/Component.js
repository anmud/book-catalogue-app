import React, {useState} from 'react';


function AddBook({books, setBooks}) {
  
  const [newBook, setNewBook] = useState({
    id: null,
    author: "",
    title: "",
    collection: "",
    volume: "",
    series: "",
    year: "",
    rating: 0,
  })

const handleInputChange = (event) => {
  const {name , value} = event.target
  setNewBook({...newBook, [name]: value})
}

const addNewBook = newBook => {
  newBook.id = books.length + 1
return  setBooks([...books, newBook])
}

  return (
    <div className="App">
    <h1>Add a new book</h1>

   <form
         onSubmit={event => {
           event.preventDefault();

           (!newBook.author || ! newBook.title || ! newBook.year)
           ? console.log("enter smth in the input")
           : addNewBook(newBook)
           setNewBook(newBook)
         }}
        >
  <label>Author</label>
  <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
  <br/>
  <label>Title</label>
  <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
 <br/>
 <label>Collection</label>
  <input type="text" name="collection" value={newBook.collection} onChange={handleInputChange} />
 <br/>
  <label>Volume</label>
  <input type="text" name="volume" value={newBook.volume} onChange={handleInputChange} />
<br/>
  <label>Series</label>
  <input type="text" name="series" value={newBook.series} onChange={handleInputChange} />
<br/>
  <label>Year</label>
  <input type="text" name="year" value={newBook.year} onChange={handleInputChange} />
<br/>
  <button type="submit"> Add </button>
 
</form>
<hr/>

 
    </div>
  );
}

export default AddBook;
