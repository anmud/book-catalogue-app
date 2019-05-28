import React, { useState } from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './components/home-page/Home'
import Catalogue from './components/books-catalogue/Component'
import AddBook from './components/add-book/Component';
import SearchBook from './components/search/Component';
import Rating from './components/rating/Component';
import EditBook from './components/edit-book/Component'
import Progress from './components/progress/Component'
import Notes from './components/notes/Component'
import Amplify from "@aws-amplify/core"
import Auth from  "@aws-amplify/auth"
import {withAuthenticator} from "aws-amplify-react"
import aws_exports from "./aws_exports"





import { createBrowserHistory } from "history"
export const history = createBrowserHistory()

Amplify.configure(aws_exports)



// default assignment
// if d is not proived as an argument to a function use the value aufter the equal sign "="
const currentDate = (d = new Date()) =>
  d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


// default assignment
// if d is not proived as an argument to a function use the value aufter the equal sign "="
const currentTime = (d = new Date()) =>
  ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2)



function App() {

  const [books, setBooks] = useState([
    // an object is a collection of 1) related data and 2) a container of primitive data type
    {
      id: 1,
      author: "Theodore Dreiser",
      title: "The Financier",
      collection: "Collected works issued in twelve volumes",
      volume: 3,
      pages: 350,
      finishedPages: 10,
      progress: 0,
      series: "A Trilogy of Desire",
      notes: [{ noteId: 1, noteAuthor: "Dimitri", content: "blabla", date: "2019-5-21", time: "09:53", bookPage: 205 }, { noteId: 2, noteAuthor: "Anastasia", content: "bala", date: "2019-4-20", time: "05:45", bookPage: 127 }],
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
      progress: 0,
      series: "A Trilogy of Desire",
      notes: [{ noteId: 1, noteAuthor: "Dimitri", content: "blabla", date: "2019-5-18", time: "08:55", bookPage: 205 }, { noteId: 2, noteAuthor: "Anastasia", content: "bala", date: "2017-2-23", time: "10:24", bookPage: 127 }],
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
      progress: 0,
      series: "A Trilogy of Desire",
      notes: [{ noteId: 1, noteAuthor: "Dimitri", content: "blabla", date: "2018-11-19", time: "15:39", bookPage: 205 }, { noteId: 2, noteAuthor: "Anastasia", content: "bala", date: "2019-5-14", time: "12:45", bookPage: 127 }],
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
      progress: 0,
      series: "no series",
      notes: [{ noteId: 1, noteAuthor: "Dimitri", content: "blabla", date: "2019-10-10", time: "10:15", bookPage: 205 }, { noteId: 2, noteAuthor: "Anastasia", content: "bala", date: "2019-6-12", time: "09:14", bookPage: 127 }],
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
    rating: 0,
    pages: 0,
    finishedPages: 0,
    progress: 0
  })

  const [editing, setEditing] = useState(false)


  const updateBook = ({ currentBook, id }) => {
    setEditing(false)
    history.goBack()
    return setBooks(books.map(book => (book.id === id ? currentBook : book)))
  }

  const editRow = book => {
    setEditing(true)
    return setCurrentBook({
      ...currentBook,
      id: book.id,
      author: book.author,
      title: book.title,
      collection: book.collection,
      volume: book.volume,
      series: book.series,
      year: book.year,
      rating: book.rating,
      pages: book.pages,
      finishedPages: book.finishedPages,
      progress: book.progress,
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

  const updateRating = ({ bookToRate, id }) => {
    setRate(false)
    history.goBack()
    return setBooks(books.map(book => (book.id === id ? { ...book, rating: bookToRate.rating } : book)))
  }

  const [toggleProgress, setToggleProgress] = useState(false)

  const [bookInProgress, setBookInProgress] = useState({
    id: 0,
    author: " ",
    title: " ",
    pages: 0,
    finishedPages: 0,
    progress: 0,
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
      progress: book.progress
    })
  }

  const updateProgress = ({ bookInProgress, id }) => {
    setToggleProgress(false)
    history.goBack()
    return setBooks(books.map(book =>
      (book.id === id ? { ...book, finishedPages: bookInProgress.finishedPages, progress: (Math.round((bookInProgress.finishedPages / bookInProgress.pages) * 100)) } : book)))
  }


  const [toggleNotes, setToggleNotes] = useState(false)

  const [bookToNote, setBookToNote] = useState({
    id: 0,
    title: "",
    notes: [{ noteId: 0, noteAuthor: "", bookTitle: "", content: "", date: '', time: "", bookPage: 0 }],
    currentDate: '',
    currentTime: ''
  })


  const addNote = ({ chosenBook }) => {
    setToggleNotes(true)
    return setBookToNote({ id: chosenBook.id, title: chosenBook.title, notes: chosenBook.notes, currentDate: currentDate(), currentTime: currentTime() })

  }




  return (
    <div className="App">


      <Router>

        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalogue">Book Catalogue</Link></li>
            <li><Link to="/add">Add a Book</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </div>

        <Switch>
          <Route exact path="/" render={() => { return <Home /> }} />
          <Route path="/catalogue" render={() => {
            return (
              <Catalogue
                books={books}
                setBooks={setBooks}
                editRow={editRow}
                editRating={editRating}
                rate={rate}
                setRate={setRate}
                updateRating={updateRating}
                bookToRate={bookToRate}
                setBookToRate={setBookToRate}
                editProgress={editProgress}
                addNote={addNote}
              />)
          }}/>

          <Route path="/add" render={() => {
            return (
                <AddBook
                books={books}
                setBooks={setBooks}
              />)
          }} />
          
          <Route path="/search" render={() => { return <SearchBook books={books} /> }} />

        </Switch>

      </Router>


      <div>
        <hr />

        {editing ? (
          <EditBook
            editing={editing}
            setEditing={setEditing}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            updateBook={updateBook}

          />)
          : (
            console.log("Page is not found")
          )
        }

        {toggleProgress ? (
          <div>
            <Progress
              bookInProgress={bookInProgress}
              setBookInProgress={setBookInProgress}
              updateProgress={updateProgress}
              books={books}
              setToggleProgress={setToggleProgress}
            />
          </div>
          ) : (
              console.log("Update your progress")

            )}

        {toggleNotes ?
          (
          <div>
             <div>
                <Notes
                  books={books}
                  setBooks={setBooks}
                  setToggleNotes={setToggleNotes}
                  bookToNote={bookToNote}
                  setBookToNote={setBookToNote}
                />
             </div>

            
          </div>

        ) : (
                  console.log("Page is not found")
                )
          }

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
            console.log("Page is not found")
          )}
      </div>



    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});
