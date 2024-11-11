import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";
import { useState } from "react";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [newTodo, setNewToDo] = useState([]);

  function handleNewToDo(item) {
    setNewToDo([...newTodo, item]);
  }

  return (
    <div className="app">
      <HeadingH1>Todo List</HeadingH1>
      <TodoList onAddTodo={handleNewToDo} todoList={newTodo} />
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
