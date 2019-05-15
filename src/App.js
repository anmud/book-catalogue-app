import React, {useState} from 'react';
import './App.css';
import Catalogue from './component/books-catalogue/Component'
import AddBook from './component/add-book/Component';
import SearchBook from './component/search/Component';
import Rating from './component/rating/Component';
import EditBook from './component/edit-book/Component'


function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      author: "Theodore Dreiser",
      title: "The Financier",
      collection: "Collected works issued in twelve volumes",
      volume: 3,
      series: "A Trilogy of Desire",
      year: 1986,
      rating: 0
    },
    {
      id: 2,
      author: "Theodore Dreiser",
      title: "The Titan",
      collection: "Collected works issued in twelve volumes",
      volume: 4,
      series: "A Trilogy of Desire",
      year: 1986,
      rating: 0
    },
    {
      id: 3,
      author: "Theodore Dreiser",
      title: "The Stoic",
      collection: "Collected works issued in twelve volumes",
      volume: 5,
      series: "A Trilogy of Desire",
      year: 1986,
      rating: 0
    },
    {
      id: 4,
      author: "Aleksandr Pushkin",
      title: "Fairy Tales",
      collection: "no collection",
      volume: 0,
      series: "no series",
      year: 1989,
      rating: 0
    },
  ])

  const [currentBook, setCurrentBook] = useState({
    id: 0,
    author: "",
    title: " ",
    collection: "",
    volume: '',
    series: "",
    year: 0,
    rating: 0
  })

  const [editing, setEditing] = useState(false)

  const addNewBook = newBook => {
    newBook.id = books.length + 1
    setBooks([...books, newBook])
  }

  const updateBook = ({ currentBook, id }) => {
      setEditing(false)
      setBooks(books.map(book => (book.id === id ? currentBook : book)))
  }

  const editRow = book => {
    setEditing(true)
    setCurrentBook({
      ...currentBook,
      id: book.id,
      author: book.author,
      title: book.title,
      collection: book.collection,
      volume: book.volume,
      series: book.series,
      year: book.year,
      rating: book.rating
    })
  }

  const [rate, setRate] = useState(false)

  const [bookToRate, setBookToRate] = useState({
    id: 0,
    author: " ",
    title: " ",
    rating: 0
  })

  const editRating = book => {
    setRate(true)
    setBookToRate({
      ...bookToRate,
      id: book.id,
      author: book.author,
      title: book.title,
      rating: book.rating
    })
  }

  const updateRating = ({bookToRate, id}) => {
    setRate(false)
    setBooks(books.map(book => (book.id === bookToRate.id ? {...book, rating: bookToRate.rating} : book)))
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


  const deleteBook = ({ books, bookId }) => {
    setBooks(books.filter(book => book.id !== bookId))
  }


  return (
    <div className="App">

      <div>
        {rate ? (

          <div>
            <Rating
              books={books}
              setBooks={setBooks}
              rate={rate}
              setRate={setRate}
              updateRating={updateRating}
              bookToRate={bookToRate}
              setBookToRate={setBookToRate}
            />
          </div>

        ) : (

            <div>
          
              <Catalogue
                books={books}
                setBooks={setBooks}
                deleteBook={deleteBook}
                editRow={editRow}
                editRating={editRating}
              />

            </div>

          )}


      </div>

      <div>
        {editing ? (

          <div>
            <EditBook
              editing={editing}
              setEditing={setEditing}
              currentBook={currentBook}
              setCurrentBook={setCurrentBook}
              updateBook={updateBook}
            />
          </div>

        ) : (

            <div>
              <AddBook addNewBook={addNewBook} />
            </div>

          )}
      </div>

      <SearchBook
        searchByAutor={searchByAutor}
        searchByTitle={searchByTitle}
        booksByAuthor={booksByAuthor}
        booksByTitle={booksByTitle}
        books={books}
      />

      <pre>{JSON.stringify(booksByAuthor, null, 4)}</pre>
      <pre>{JSON.stringify(booksByTitle, null, 4)}</pre>
    </div>
  );
}

export default App;
