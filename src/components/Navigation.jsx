import { NavLink, Routes, Route } from "react-router-dom";
import Button from "./Button"; // Adjust the import based on your structure

export default function Navigation() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => ({ display: isActive ? "none" : "block" })}
          >
            <Button>About</Button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({ display: isActive ? "none" : "block" })}
          >
            <Button>Home</Button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todo"
            style={({ isActive }) => ({ display: isActive ? "none" : "block" })}
          >
            <Button>Todo</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
