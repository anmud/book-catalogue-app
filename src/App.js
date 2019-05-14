import React, {useState} from 'react';
import './App.css';
//import StarRating from "./StarRating"


function App() {
  const [books, setBooks] = useState([
    {id: 1,
    author: "Theodore Dreiser",
    title: "The Financier",
    collection: "Collected works issued in twelve volumes",
    volume: 3,
    series: "A Trilogy of Desire",
    year: 1986, },
    {id: 2,
    author: "Theodore Dreiser",
    title: "The Titan",
    collection: "Collected works issued in twelve volumes",
    volume: 4,
    series: "A Trilogy of Desire",
    year: 1986, },
    {id: 3,
      author: "Theodore Dreiser",
      title: "The Stoic",
      collection: "Collected works issued in twelve volumes",
      volume: 5,
      series: "A Trilogy of Desire",
      year: 1986, },
      {id: 4,
        author: "Aleksandr Pushkin",
        title: "Fairy Tales",
        volume: '',
        series: "",
        year: 1989, },
    ])

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

const addNewBook = newBook => {
  newBook.id = books.length + 1
  setBooks([...books, newBook])
}

const [searchValue, setSearchValue] = useState({
  author: '',
  title: '',
})

const [booksByAuthor, setBooksByAuthor] = useState([])
const [booksByTitle, setBooksByTitle] = useState([])

const handleSearchInputChanges = event => {
const {name, value} = event.target
  setSearchValue({...searchValue, [name]: value})
}


const searchByAutor = ({searchValue, books}) => {
 const bookByAutor =  books.filter(book => {
     return book.author.toLowerCase().includes(searchValue.author.toLowerCase())
  })
  console.log("bookByAuthor", bookByAutor)
  setBooksByTitle([])
  return setBooksByAuthor(bookByAutor)

}

const searchByTitle = ({searchValue, books}) => {
 const bookByTitle = books.filter(book => {
    return book.title.toLowerCase().includes(searchValue.title.toLowerCase())
 })
 console.log("bookByTitle", bookByTitle)
 setBooksByAuthor([])
return setBooksByTitle(bookByTitle)
}

console.log("searchValue",searchValue)

//const [totalStars, setTotal] = useState(5)


// const Star = ({selected, onClick}) => {
//   return <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
// }

// const StarRating = ({totalStars}) => {

// const [starsSelected, setStarsSelected] = useState(0)

//   console.log("arr",[...Array(totalStars)])
//  return (
//    <div className="star-rating">
//    { 
//     [...Array(totalStars)].map((number, i) => (
//     <Star
//     key={i}
//     selected={i < (starsSelected || 0)}
//     onClick={() => setStarsSelected( i + 1)}
//    />
//    ))}
//     <p>
//       {starsSelected} of {totalStars} stars
//     </p>
//    </div>
//  )
// }


  return (
    <div className="App">
    <h1>Books catalogue</h1>

{/* books table */}
    <table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Volume</th>
        <th>Series</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
        {books.length > 0 ? 
        (books.map(book => ( 
      <tr key={book.id}>
        <td>{book.author}</td>
        <td>{book.title}</td>
        <td>{book.volume}</td>
        <td>{book.series}</td>
        <td>{book.year}</td>
        <td>
          <button >Edit</button>
          <button >Delete</button>
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
   {/* books table end */}


 {/* add a new book page start */}
   <h2>Add a new book</h2>

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

  <label>Title</label>
  <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />

  <label>Volume</label>
  <input type="text" name="volume" value={newBook.volume} onChange={handleInputChange} />

  <label>Series</label>
  <input type="text" name="series" value={newBook.series} onChange={handleInputChange} />

  <label>Year</label>
  <input type="text" name="year" value={newBook.year} onChange={handleInputChange} />

  <button>Add new book</button>
</form>
<hr/>

 {/* add a new book page end */}
  {/* <h2>Set you rating for the book</h2>
  <div>
    <StarRating totalStars={totalStars}/> 
  </div> */}

 {/* book rating page start */}

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

      <ul>
        { booksByAuthor.length > 0 ?
        (
          booksByAuthor.map(book => (
          <li key={book.id}><strong>Book:</strong> {book.author} {book.title}</li>
        ))

        ) : (

          booksByTitle.map(book => (
            <li key={book.id}><strong>Book:</strong> {book.author} / "{book.title}"</li>
          ))
        )
      }
       </ul>

    
</div>
  

  <pre>{JSON.stringify(searchValue, null, 4)}</pre>
  <pre>{JSON.stringify(booksByAuthor, null, 4)}</pre>
  <pre>{JSON.stringify(booksByTitle, null, 4)}</pre>
    </div>
  );
}

export default App;
