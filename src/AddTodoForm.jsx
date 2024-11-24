import { useState } from "react";
import Button from "../public/components/Button";
import PropTypes from "prop-types";

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    const newTodoTitle = {
      id: Date.now(),
      title: todoTitle,
    };

    console.log(newTodoTitle);

    if (todoTitle.trim() !== "") {
      onAddTodo(newTodoTitle);
      setTodoTitle("");
    } else {
      alert("Please enter a valid todo title.");
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>

        <input
          type="text"
          id="todoTitle"
          value={todoTitle} //The input element should use value={todoTitle} to maintain it as a controlled component.
          onChange={handleTitleChange}
        />

        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
