import React  from 'react';



function Rating({ bookToRate, setBookToRate, updateRating}) {
  

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBookToRate({ ...bookToRate, [name]: value })
  }

  return (
    <div>

      <h3>Set you rating (1-5)</h3>

      <p>{bookToRate.author} : </p>
      <p>"{bookToRate.title}"</p> 
      <br />
      <input type="text" name="rating" value={bookToRate.rating} onChange={handleInputChange} />
      <button onClick={() => updateRating({bookToRate: bookToRate, id: bookToRate.id})}>Rate</button>
      <br />


    </div>
  );
}

export default Rating;
