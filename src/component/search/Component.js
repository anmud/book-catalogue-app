import React, {useState} from 'react';


function SearchBook(props) {
  
    const [searchValue, setSearchValue] = useState({
        author: '',
        title: '',
      })
    
    const handleSearchInputChanges = event => {
        const {name, value} = event.target
          setSearchValue({...searchValue, [name]: value})
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
  
   <button onClick={() => props.searchByAutor({searchValue: searchValue, books: props.books})}> Search </button>
   <br/>
   <br/>
   <label>Search by Title </label>
   <input
     name="title"
     value={searchValue.title}
     onChange={(event) => handleSearchInputChanges(event)}
     type="text"
   />
   <button onClick={() => props.searchByTitle({searchValue: searchValue, books: props.books})}> Search </button>


   <br/>
   <br/>

 <ol>
   { props.booksByAuthor.length > 0 ?
   (
     props.booksByAuthor.map(book => (
     <li key={book.id}> {book.author} : "{book.title}" / {book.collection} - vol. {book.volume}. - {book.series}. - {book.year}</li>
   ))

   ) : (

     props.booksByTitle.map(book => (
       <li key={book.id}> {book.author} : "{book.title}" / {book.collection} - vol. {book.volume}. - {book.series}. - {book.year}</li>
     ))
   )
 }
  </ol>


</div>

<pre>{JSON.stringify(searchValue, null, 4)}</pre>

 
    </div>
  );
}

export default SearchBook;
