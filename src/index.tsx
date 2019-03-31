import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/bootstrap.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>,

  document.getElementById("root")
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
