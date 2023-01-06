import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import dotenv from 'dotenv'
import { StateProvider } from "./context/StateProvider";
import { initialState } from './context/initialState';
import reducer from "./context/reducer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);
