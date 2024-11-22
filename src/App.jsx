import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useState } from "react";

const todoList = [
  { id: 1, title: "Add new task" },
  { id: 2, title: "Edit" },
  { id: 3, title: "Task done" },
];

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [newTodo, setNewToDo] = useState([]);

  function handleNewToDo(item) {
    setNewToDo(item);
  }

  return (
    <div className="app">
      <HeadingH1>Todo List</HeadingH1>
      <AddTodoForm onAddTodo={handleNewToDo} />
      <p>{newTodo.title} </p>
      <TodoList todoList={todoList} />
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
