import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import "./index.css";
import AppRouter from "./components/FormReg";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
