import React, {useState} from 'react';
import './App.css';
import Catalogue from './component/books-catalogue/Component'
import AddBook from './component/add-book/Component';
import SearchBook from './component/search/Component';
import Rating from './component/rating/Component';
import EditBook from './component/edit-book/Component'
import Progress from './component/progress/Component'
import Notes from './component/notes/Component'


function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      author: "Theodore Dreiser",
      title: "The Financier",
      collection: "Collected works issued in twelve volumes",
      volume: 3,
      pages: 350,
      finishedPages: 10,
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
      pages: 258,
      finishedPages: 0,
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
      pages: 320,
      finishedPages: 0,
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
      pages: 150,
      finishedPages: 0,
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


  const updateBook = ({ currentBook, id }) => {
      setEditing(false)
    return  setBooks(books.map(book => (book.id === id ? currentBook : book)))
  }

  const editRow = book => {
    setEditing(true)
  return  setCurrentBook({
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
   return setBookToRate({
      ...bookToRate,
      id: book.id,
      author: book.author,
      title: book.title,
      rating: book.rating
    })
  }

  const updateRating = ({bookToRate, id}) => {
    setRate(false)
    return setBooks(books.map(book => (book.id === bookToRate.id ? {...book, rating: bookToRate.rating} : book)))
  }

  const [toggleProgress, setToggleProgress] = useState(false)

  const [bookInProgress, setBookInProgress] = useState({
    id: 0,
    author: " ",
    title: " ",
    pages: 0,
    finishedPages: 0,
  })

  const editProgress = book => {
    setToggleProgress(true)
    return setBookInProgress({
      ...bookInProgress,
      id: book.id,
      author: book.author,
      title: book.title,
      pages: book.pages,
      finishedPages: book.finishedPages,
    })
  }


  const updateProgress = ({ bookInProgress, id}) => {
   return setBooks(books.map(book => 
    (book.id === id ? { ...book, finishedPages: bookInProgress.finishedPages } : book)))
    
   // return countProgress(books,id)
  }

  // const [percent, setPercent] = useState(0)

  // const countProgress = (books,id) => {
  //   const result = books.map(book => (
  //     book.id === id 
  //     ? parseFloat((book.finishedPages * book.pages / 100) + " %")
  //     : book
  //   ))
  //   console.log("result", result)
  //   return parseFloat(setPercent())
  // }



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
                editRow={editRow}
                editRating={editRating}
                editProgress={editProgress}
              />

            </div>

          )
          
          }

      </div>

      <div>
        {
          toggleProgress ? (
           <div>
            <Progress
          bookInProgress={bookInProgress}
          setBookInProgress={setBookInProgress}
          updateProgress={updateProgress}
          books={books}
          />
          </div>

          ) : (

           console.log("Update your progress")

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
              <AddBook 
              books={books}
              setBooks={setBooks}
               />
            </div>

          )}
      </div>

      <SearchBook
        books={books}
      />
      
      <Notes
      books={books}
      />
      

     
    </div>
  );
}

export default App;
