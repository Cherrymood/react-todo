import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import SearchList from "./components/SerachList";
import Pagination from "./components/Pagination";

export default function App() {
  const [todoList, setToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setcurrentPage] = useState(1);
  const [todoPerPage, setTodoPerPage] = useState(5);

  async function handleAddTodo(newTodo) {
    try {
      setIsLoading(true);

      console.log("newTodo", newTodo);

      const addedTodo = await fetchDataPost(newTodo);

      console.log("addedTodo", addedTodo);

      if (addedTodo) {
        setToDoList((prevTodoList) => [...prevTodoList, addedTodo]);

        console.log("after", todoList);
      } else {
        throw new Error("Failed to add todo.");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch(todo) {
    setSearchTerm(todo);
  }

  function handleReturn() {
    setSearchTerm("");
    setFilteredTodos(todoList);
  }

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTodos([]);
    } else {
      const filtered = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  }, [searchTerm]);

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
      // console.log("Airtable API response:", data);

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
      }));

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
          created: Date.now().toString(),
        },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }`,
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
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const result = await response.json();
      console.log("result", result);

      return { id: result.id, title: result.fields.Title };
    } catch (error) {
      console.error("Error posting data:", error);
      return { error: error.message };
    }
  }

  async function fetchDataDelete(recordId) {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }/${recordId}`,
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

      // const dataResponse = await response.json();

      return { success: true, deletedId: recordId };
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
  }
  function toggleSortOrder() {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortedTodos = [...todoList].sort((a, b) => {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setToDoList(sortedTodos);
  }, [sortOrder]);

  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <div className="app">
      <img src="/to-do-list.png" alt="Main picture" className="app-image" />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeadingH1>Todo List</HeadingH1>

                <AddTodoForm
                  onAddTodo={handleAddTodo}
                  onSearch={handleSearch}
                  onSort={toggleSortOrder}
                />
                {isLoading ? (
                  <p>Loading...</p>
                ) : searchTerm ? (
                  filteredTodos.length > 0 ? (
                    <>
                      <SearchList filteredTodos={filteredTodos} />
                      <Button onClick={handleReturn}>Return</Button>
                    </>
                  ) : (
                    <>
                      <p>No results found</p>
                      <Button onClick={handleReturn}>Return</Button>
                    </>
                  )
                ) : (
                  <TodoList todoList={currentTodos} onRemoveTodo={removeTodo} />
                )}
                <Pagination
                  todoPerPage={todoPerPage}
                  totalTodos={todoList.length}
                  setCurrentPage={setcurrentPage}
                  currentPage={currentPage}
                />
              </>
            }
          />
          <Route path="/new" element={<HeadingH1>New Todo List</HeadingH1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
