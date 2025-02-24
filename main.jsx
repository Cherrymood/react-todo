import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/main.css";
import AppRouter from "./src/BrowserRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
