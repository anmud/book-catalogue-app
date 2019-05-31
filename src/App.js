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
import API, {graphqlOperation} from '@aws-amplify/api'





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
    
  ])


  const [currentBook, setCurrentBook] = useState({
    id: "0",
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
    id: "0",
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


  const updateRating = async ({ bookToRate, id }) => {
    setRate(false)
    history.goBack()
   const {data} = await API.graphql(graphqlOperation(`
    mutation rating {
      setRating(input: {
        id: ${JSON.stringify(id)}
        rating: ${bookToRate.rating}
      })
    }`))
     setBooks(books.map(book => (book.id === id ? { ...book, rating: bookToRate.rating } : book)))
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


  const updateProgress = async ({ bookInProgress, id }) => {
    setToggleProgress(false)
    history.goBack()
    setBooks(books.map(book =>
      (book.id === id ? { ...book, finishedPages: bookInProgress.finishedPages, progress: (Math.round((bookInProgress.finishedPages / bookInProgress.pages) * 100)) } : book)))
   const {data} = await API.graphql(graphqlOperation(`
    mutation finishedPages {
      setProgress(input: {
        id: ${JSON.stringify(id)}
        finishedPages:  ${bookInProgress.finishedPages}
        progress: ${(Math.round((bookInProgress.finishedPages / bookInProgress.pages) * 100))}
      })
    }`))
      
   }

  const [toggleNotes, setToggleNotes] = useState(false)

  const [bookToNote, setBookToNote] = useState({
    id: "0",
    title: "",
    notes: [{ noteId: 0, bookId: "", noteAuthor: "", bookTitle: "", content: "", date: '', time: "", bookPage: 0 }],
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
