import React, {useState} from 'react';
import { history } from "../../App"
import API, {graphqlOperation} from "@aws-amplify/api"


function AddBook({books, setBooks}) {
  
  const [newBook, setNewBook] = useState({
    id: " ",
    author: "",
    title: "",
    collection: "",
    volume: "",
    series: "",
    year: "",
    rating: 0,
    pages: 0,
  })

const handleInputChange = (event) => {
  const {name , value} = event.target
  setNewBook({...newBook, [name]: value})
}


  const addBookDB = async (newBook) => {
     await API.graphql(graphqlOperation(`
      mutation addBook {
        addBook(input: {
          author: ${JSON.stringify(newBook.author)}
          title:  ${JSON.stringify(newBook.title)}
          collection:  ${JSON.stringify(newBook.collection)}
          volume:  ${JSON.stringify(newBook.volume)}
          series:  ${JSON.stringify(newBook.series)}
          pages:  ${newBook.pages}
          year:  ${JSON.stringify(newBook.year)}
        })
      }`))
      setBooks([...books, newBook])
    }



  return (
    <div className="App">
    <h1>Add a new book</h1>

   <form
         onSubmit={event => {
           event.preventDefault();

           (!newBook.author || ! newBook.title || ! newBook.year)
           ? console.log("enter smth in the input")
           : addBookDB(newBook)
           setNewBook(newBook)
           history.goBack()
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
<label>Number of pages</label>
  <input type="text" name="pages" value={newBook.pages} onChange={handleInputChange} />
<br/>
  <button type="submit"> Add </button>
 
</form>



 
    </div>
  );
}

export default AddBook;
