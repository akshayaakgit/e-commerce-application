import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRoutes from "./Routes/AllRoutes.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider child={ <AllRoutes />} />
    
    </BrowserRouter>
  </React.StrictMode>
);
