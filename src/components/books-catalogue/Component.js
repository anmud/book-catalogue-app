import React, {useEffect}  from 'react';
import { Link, } from 'react-router-dom'
import API, {graphqlOperation} from '@aws-amplify/api'



function Catalogue(props) {

  const {books, setBooks, editRow, editRating, editProgress, addNote } = props
 

  useEffect(() => {
    // getBooks is an impure function
    // it does side-effect: loads data from the database
    //t
    const getBooks = async () => {
      const bookList = await API.graphql(graphqlOperation(`
        query getBooks {
          getBooks {
            id
            author
            title
            collection
            volume
            series
            year
            finishedPages
            progress
            rating
            notes {
              noteId
              noteAuthor
              content
              date
              bookPage
            }
            pages
          }
        }`))
        setBooks(bookList.data.getBooks)
      }
    getBooks()
  }, [])
  console.log(books)


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

 

 const deleteBook = async ({ books, bookId }) => {
  await API.graphql(graphqlOperation(`
  mutation deleteBook {
    deleteBook(input: {
      id: ${JSON.stringify(bookId)}
    })
  }`))
  setBooks(books.filter(book => book.id !== bookId))
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
        <th>Pages</th>
        <th>Progress</th>
        <th>Rating</th>
        <th>Actions</th>
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
        <td>{book.pages}</td>
        <td>{book.progress} %</td>
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
