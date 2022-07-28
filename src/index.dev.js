import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// import App components
import { App } from "./App";
import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";

// compile App component in `#app` HTML element
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
