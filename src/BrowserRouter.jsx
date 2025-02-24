import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./home";
import About from "./about";
import Navigation from "./components/Navigation";

export default function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<App />} />
      </Routes>
    </Router>
  );
}
