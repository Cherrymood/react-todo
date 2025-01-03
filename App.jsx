import PropTypes from "prop-types";
import TodoList from "./src/TodoList";
import AddTodoForm from "./src/AddTodoForm";
import { useEffect, useState } from "react";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

// const apiToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
// const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
// const tableName = import.meta.env.VITE_TABLE_NAME;

// console.log(apiToken, baseId, tableName);

export default function App() {
  const [todoList, setToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function addTodoHandler(newTodo) {
    // console.log(newTodo);

    const addedTodo = await fetchDataPost(newTodo);

    if (addedTodo) {
      setToDoList((prevTodoList) => [...prevTodoList, addedTodo]);
    } else {
      console.error("Failed to add todo.");
    }
  }

  function removeTodo(id) {
    setToDoList(todoList.filter((todo) => todo.id !== id));
  }
  // Mimicking a side-effect operation with a delay
  function sideEffectHandler() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true;

        if (success) {
          resolve({
            data: [
              { id: 1734998055204, title: "Clean room" },
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

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      setIsLoading(true);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Airtable API response:", data);

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
      }));

      // Log todos (optional)
      todos.forEach((todo) => {
        console.log(`New ID: ${todo.id}`);
        console.log(`New TITLE: ${todo.title}`);
        console.log(`New Todo:`, todo);
      });

      setToDoList(todos);

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchDataPost(data) {
    try {
      const airtableData = {
        fields: {
          Title: data.title,
        },
      };

      // console.log(airtableData);

      const response = await fetch(
        `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/Default`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      // console.log(response);

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();

      // console.log({ id: dataResponse.id, title: dataResponse.fields.Title });

      return { id: dataResponse.id, title: dataResponse.fields.Title };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      <div className="app">
        <img
          src="public/to-do-list.png"
          alt="Main picture"
          className="app-image"
        />

        <HeadingH1>Todo List</HeadingH1>

        <AddTodoForm onAddTodo={addTodoHandler} />

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
