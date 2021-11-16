import React from 'react'; 
import { Textfit } from "react-textfit";
import "./display.css";

const display = ({ value }) => {
  return (
    <Textfit className="display" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default display;