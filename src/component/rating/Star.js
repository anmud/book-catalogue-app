import React from 'react';



function Star(props) {

  return (
    <div>


   <div className={props.selected ? "star selected" : "star"} onClick={props.onClick}></div>

 
    </div>
  );
}

export default Star;
