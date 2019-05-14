import React, {useState} from 'react';


function AddBook(props) {
  
  const [newBook, setNewBook] = useState({
    id: null,
    author: "",
    title: "",
    volume: "",
    series: "",
    year: "",
  })

const handleInputChange = (event) => {
  const {name , value} = event.target
  setNewBook({...newBook, [name]: value})
}

  return (
    <div className="App">
    <h1>Add a new book</h1>

   <form
         onSubmit={event => {
           event.preventDefault();

           (!newBook.author || ! newBook.title || ! newBook.year)
           ? console.log("enter smth in the input")
           : props.addNewBook(newBook)
           setNewBook(newBook)
         }}
        >
  <label>Author</label>
  <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
  <br/>
  <label>Title</label>
  <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
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
  <button> Add </button>
</form>
<hr/>

 
    </div>
  );
}

export default AddBook;