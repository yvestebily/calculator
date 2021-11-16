import React from 'react'; 
import "./button.css";

const button = ({ className, value, onClick }) => {
    return (
      <button className={className} onClick={onClick}>
        {value}
      </button>
    );
  };
  
  export default button;