import React, {useState} from 'react';


function SearchBook({books}) {
  
    const [searchValue, setSearchValue] = useState({
        author: '',
        title: '',
      })
    
    const handleSearchInputChanges = event => {
        const {name, value} = event.target
          setSearchValue({...searchValue, [name]: value})
        }
                
        const [booksByAuthor, setBooksByAuthor] = useState([])
        const [booksByTitle, setBooksByTitle] = useState([])
      
      
        const searchByAutor = ({ searchValue, books }) => {
          const bookByAutor = books.filter(book => {
            return book.author.toLowerCase().includes(searchValue.author.toLowerCase())
          })
          console.log("bookByAuthor", bookByAutor)
          setBooksByTitle([])
          return setBooksByAuthor(bookByAutor)
      
        }
      
        const searchByTitle = ({ searchValue, books }) => {
          const bookByTitle = books.filter(book => {
            return book.title.toLowerCase().includes(searchValue.title.toLowerCase())
          })
          console.log("bookByTitle", bookByTitle)
          setBooksByAuthor([])
          return setBooksByTitle(bookByTitle)
        }

  return (
    <div className="App">
    <h1>Search a  book</h1>

    <div>

   <label>Search by Author </label>
   <input
     name="author"
     value={searchValue.author}
     onChange={(event) => handleSearchInputChanges(event)}
     type="text"
   />
  
   <button onClick={() => searchByAutor({searchValue: searchValue, books: books})}> Search </button>
   <br/>
   <br/>
   <label>Search by Title </label>
   <input
     name="title"
     value={searchValue.title}
     onChange={(event) => handleSearchInputChanges(event)}
     type="text"
   />
   <button onClick={() => searchByTitle({searchValue: searchValue, books: books})}> Search </button>


   <br/>
   <br/>

 <ol>
   { booksByAuthor.length > 0 ?
   (
     booksByAuthor.map(book => (
     <li key={book.id}> {book.author} : "{book.title}" / {book.collection} - vol. {book.volume}. - {book.series}. - {book.year}</li>
   ))

   ) : (

     booksByTitle.map(book => (
       <li key={book.id}> {book.author} : "{book.title}" / {book.collection} - vol. {book.volume}. - {book.series}. - {book.year}</li>
     ))
   )
 }
  </ol>


</div>

{/* <pre>{JSON.stringify(searchValue, null, 4)}</pre>

   <pre>{JSON.stringify(booksByAuthor, null, 4)}</pre>
      <pre>{JSON.stringify(booksByTitle, null, 4)}</pre> */}
    </div>
  );
}

export default SearchBook;
