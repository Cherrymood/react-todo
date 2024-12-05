import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useState } from "react";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [todoList, setToDoList] = useState([]);

  function addTodo(newTodo) {
    setToDoList([...todoList, newTodo]);
  }

  return (
    <div className="app">
      <img src="to-do-list.png" alt="Main picture" className="app-image" />
      <HeadingH1>Todo List</HeadingH1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
