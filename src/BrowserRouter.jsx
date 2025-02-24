import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import Home from "./home";
import Button from "./components/Button";
import About from "./about";

export default function AppRouter() {
  return (
    <Router>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </li>
          <li>
            <Link to="/todo">
              <Button>Todo</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route index element={<About />} />
        <Route path="/todo" element={<App />} />
      </Routes>
    </Router>
  );
}
