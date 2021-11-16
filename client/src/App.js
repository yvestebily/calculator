import React, { useState } from "react";
//import {memorySave} from "./api/app";
import Frame from "./elements/frame";
import Display from "./elements/display";
import ButtonGrid from "./elements/buttonGrid";
import Button from "./elements/button";
//import app from "../../api/app";

const buttonValues = [
  ["AC", "MS", "MR"],
  [7, 8, 9, "+"],
  [4, 5, 6, "-"],
  [1, 2, 3, "X"],
  [0, ".","/", "="],
];


const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setScreen] = useState({
    operation: "",
    num: 0,
    result: 0,
  });

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setScreen({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        result: !calc.operation ? 0 : calc.result,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setScreen({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setScreen({
      ...calc,
      operation: value,
      result: !calc.result && calc.num ? calc.num : calc.result,
      num: 0,
    });
  };

  const memorysaveClickHandler=(e)=>{
    e.preventDefault();
    //const value = e.target.innerHTML;
    //memorySave(calc.num);
    setScreen({
      ...calc,
      num:calc.num,
    })
  }

  
  const memoryreadClickHandler=(e)=>{
    e.preventDefault();
    //const value = e.target.innerHTML;
    //memorySave(calc.num);
    setScreen({
      ...calc,
      num:calc.num,
    })
  }


  const equalsClickHandler = () => {
    if (calc.operation && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setScreen({
        ...calc,
        result:
          calc.num === "0" && calc.operation === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.result)),
                  Number(removeSpaces(calc.num)),
                  calc.operation
                )
              ),
        operation: "",
        num: 0,
      });
    }
  };



  const resetClickHandler = () => {
    setScreen({
      ...calc,
      operation: "",
      num: 0,
      result: 0,
    });
  };

  return (
    <Frame>
      <Display value={calc.num ? calc.num : calc.result} />
      <ButtonGrid>
        {buttonValues.flat().map((btn, i) => {
            return (
              <Button
              key={i}
              className={btn === "AC" ? "ac" : ""}
              value={btn}
              onClick={
                btn === "AC"
                  ? resetClickHandler
                  : btn==="MS"
                  ? memorysaveClickHandler
                  :btn==="MR"
                  ?memoryreadClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numberClickHandler
              }
            />   
            );
          })}
      </ButtonGrid>
    </Frame>
  );
};

export default App;
