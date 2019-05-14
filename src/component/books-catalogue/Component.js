import React  from 'react';


function Catalogue(props) {
  
  return (
    <div className="App">
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
        {props.books.length > 0 ? 
        (props.books.map(book => ( 
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


 
    </div>
  );
}

export default Catalogue;
