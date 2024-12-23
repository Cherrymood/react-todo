import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useEffect, useState } from "react";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [todoList, setToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mimicking a side-effect operation with a delay
  function sideEffectHandler() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true;

        if (success) {
          resolve({
            data: [
              { id: 1734998055204, title: "Clean roon" },
              { id: 1734998066475, title: "Bake a cake" },
              { id: 1734998086843, title: "Make my bed" },
            ],
          });
        } else {
          reject("An error occurred during the operation.");
        }
      }, 2000);
    });
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodos) {
      setToDoList(savedTodos);
    }

    sideEffectHandler()
      .then((result) => {
        console.log("Operation succeeded:", result);
        setToDoList(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Operation failed:", error);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
      </div>
    </>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
