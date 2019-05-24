import React  from 'react';
import { Link, } from 'react-router-dom'

function Catalogue(props) {
  // CRUD - Create, Read, Update, Delete
  // Create: setState()
  // Read: render()
  // Update: map() --> reduce()
  // Delete: filter() --> reduce()

  // [{id: 1, name: "Anastasia"}, {id: 2, name: "Dimitri"}].map(entry => {
  //    entry.name === "Anastasia"
   //       ? ({id: entry.id, firstName: entry.name, lastName: "Mudrova"})
    //      : entry
  

 // })

 const {books, setBooks, editRow, editRating, editProgress, addNote } = props

 const deleteBook = ({ books, bookId }) => {
  return setBooks(books.filter(book => book.id !== bookId))
 }


  return (
    <div className="App">
  <h1>Books catalogue</h1>

    <table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Colleciton</th>
        <th>Volume</th>
        <th>Series</th>
        <th>Year</th>
        <th>Finished Pages</th>
        <th>Progress</th>
        <th>Rating</th>
        <th>Progress</th>
      </tr>
    </thead>
    <tbody>
        {books.length > 0 ? 
        (books.map(book => ( 
      <tr key={book.id}>
        <td>{book.author}</td>
        <td>{book.title}</td>
        <td>{book.collection}</td>
        <td>{book.volume}</td>
        <td>{book.series}</td>
        <td>{book.year}</td>
        <td>{book.finishedPages}</td>
        <td>{book.progress}</td>
        <td>{book.rating}</td>
     
        <td>
          <Link to="/edit"><button onClick={() => editRow(book)}>Edit</button></Link> 
         <button onClick={()=>deleteBook({books: books, bookId: book.id})}>Delete</button>
          <Link to="/rate"><button onClick={() => editRating(book)}>Rate</button></Link>
         <Link to="/progress"><button onClick={() => editProgress(book)}>Set progress</button></Link>
          <Link to="/notes"><button onClick={() => addNote({books: books, chosenBook: book})}>Add note</button></Link>
       
        </td>
      </tr>
        ))
    ) : (
        <tr>
        <td colSpan={3}>No books</td>
      </tr>
    )}
    </tbody>
  </table>



 
    </div>
  );
}


export default Catalogue;
