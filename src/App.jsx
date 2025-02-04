import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

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

  async function removeTodo(id) {
    const result = await fetchDataDelete(id);
    if (result.success) {
      setToDoList(todoList.filter((todo) => todo.id !== id));
    } else {
      console.error("Failed to delete todo:", result.error);
    }
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      return { id: result.id, title: result.fields.Title };
    } catch (error) {
      console.error("Error posting data:", error);
      return null;
    }
  }

  async function fetchDataDelete(recordId) {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/Default/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();

      return { success: true, deletedId: recordId };
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <img src="/to-do-list.png" alt="Main picture" className="app-image" />

      <BrowserRouter>
        <Routes>
          {/* Define the route for the root path */}
          <Route
            path="/"
            element={
              <>
                <HeadingH1>Todo List</HeadingH1>
                <AddTodoForm onAddTodo={addTodoHandler} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </>
            }
          />
          <Route path="/new" element={<HeadingH1>New Todo List </HeadingH1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
