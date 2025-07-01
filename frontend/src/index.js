// frontend/src/index.js
// Entry point for Lonz Flawless Aura - Where luxury meets code

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // Global luxury styles

// Example: If you use a theme provider or analytics, import here
// import { ThemeProvider } from './theme/ThemeProvider';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrap with ThemeProvider or other global providers here if needed */}
    <App />
  </React.StrictMode>
);

// To measure performance in your app, pass a function to log results
// or send to analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);