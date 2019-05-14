import React, {useState} from 'react';
import Star from './Star'


function Rating(props) {
  


const [selectedStars, setSelectedStars] = useState(0)



  return (
    <div className="App">
    <h1>Rate a book</h1>


    <div className="star-rating">
   { 
    [...Array(props.totalStars)].map((number, i) => (
    <Star
    key={i}
    selected={i < (selectedStars || 0)}
    onClick={() => setSelectedStars( i + 1)}
   />
   ))}
    <p>
      {selectedStars} of {props.totalStars} stars
    </p>
   </div>

 
    </div>
  );
}

export default Rating;
