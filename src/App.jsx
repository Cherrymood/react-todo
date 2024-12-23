import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useEffect, useState } from "react";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [todoList, setToDoList] = useState(() => {
    const savedList = localStorage.getItem("savedTodoList");

    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  function addTodo(newTodo) {
    setToDoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setToDoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div className="app">
        <img src="to-do-list.png" alt="Main picture" className="app-image" />
        <HeadingH1>Todo List</HeadingH1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      </div>
    </>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
