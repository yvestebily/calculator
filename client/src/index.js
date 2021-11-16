import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
//import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
