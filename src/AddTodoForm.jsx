import Button from "../public/components/Button";
import PropTypes from "prop-types";
import { useState } from "react";

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleAddTodo(e) {
    e.preventDefault();

    const newToDoList = {
      id: Date.now(),
      title: todoTitle,
    };
    console.log(newToDoList);

    if (todoTitle.trim() !== "") {
      onAddTodo(newToDoList);
      setTodoTitle("");
    } else {
      alert("Please enter a valid todo title.");
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input
          type="text"
          id="todoTitle"
          onChange={(e) => setTodoTitle(e.target.value)}
        />

        <Button OnClick={handleAddTodo}>Add</Button>
      </form>
    </>
  );
}
