import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import "./index.css";
import App from "./App";
import AppRouter from "./App";
import FormReg from "./components/FormReg";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FormReg />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
