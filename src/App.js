import React, {useState} from 'react';
import './App.css';
//import StarRating from "./StarRating"
import Catalogue from './component/books-catalogue/Component'
import AddBook from './component/add-book/Component';
import SearchBook from './component/search/Component';
import Rating from './component/rating/Component'

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


const addNewBook = newBook => {
  newBook.id = books.length + 1
  setBooks([...books, newBook])
}


const [booksByAuthor, setBooksByAuthor] = useState([])
const [booksByTitle, setBooksByTitle] = useState([])


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

const [totalStars, setTotal] = useState(5)


  return (
    <div className="App">
    <h1>Books catalogue</h1>

    <Catalogue books={books}/>
    <AddBook addNewBook={addNewBook}/>
    <SearchBook
    searchByAutor={searchByAutor}
    searchByTitle={searchByTitle}
    booksByAuthor={booksByAuthor}
    booksByTitle={booksByTitle}
    books={books}
    />
    <Rating totalStars={totalStars}/>

  
  <pre>{JSON.stringify(booksByAuthor, null, 4)}</pre>
  <pre>{JSON.stringify(booksByTitle, null, 4)}</pre>
    </div>
  );
}

export default App;
