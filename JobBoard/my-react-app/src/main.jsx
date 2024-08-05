import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Components/LoginPage.jsx";
import SignUpPage from "./Components/SignUpPage.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
       <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
