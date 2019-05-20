import React  from 'react';



function Progress({bookInProgress, setBookInProgress, updateProgress, books,   }) {
  
const handleInputChange = event => {
    const {name, value} = event.target
    setBookInProgress({...bookInProgress, [name]: value})
}


  return (
    <div>
     
     <h2>How many pages of this book have you already read?</h2>
     <div>
       
       <p>{bookInProgress.author} : "{bookInProgress.title}"</p>
     
     </div>


     <input type="text" name="finishedPages" value={bookInProgress.finishedPages} onChange={handleInputChange} />
     <button onClick={() => updateProgress({bookInProgress: bookInProgress, id: bookInProgress.id})}>Update progress</button>
    


     <p>You've already read {bookInProgress.finishedPages} from {bookInProgress.pages} pages, percentage of {Math.round((bookInProgress.finishedPages / bookInProgress.pages) * 100) + "%"}</p>
   
   <hr/>
    </div>
  );
}

export default Progress;
