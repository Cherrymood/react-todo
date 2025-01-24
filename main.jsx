import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/main.css";
import App from "./src/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
