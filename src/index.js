import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
