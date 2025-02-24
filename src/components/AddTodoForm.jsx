import { useState } from "react";
import Button from "/src/components/Button.jsx";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

export default function AddTodoForm({ onAddTodo, onSearch }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    const newTodoTitle = {
      id: Date.now(),
      title: todoTitle,
    };

    if (todoTitle.trim() !== "") {
      onAddTodo(newTodoTitle);
      setTodoTitle("");
    } else {
      alert("Please enter a valid todo title.");
    }
  }

  function handleInput() {
    setIsSearch(true); // Trigger search mode
  }

  function handleSearch(e) {
    e.preventDefault();
    // console.log(todoTitle);
    onSearch(todoTitle);
    setIsSearch(false);
    setTodoTitle("");
  }

  return (
    <div className="add-todo-list">
      <form onSubmit={isSearch ? handleSearch : handleAddTodo}>
        <InputWithLabel
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
        >
          Title
        </InputWithLabel>
        <Button className="button-33" type="submit">
          Add
        </Button>
        <Button className="button-33" type="submit" onClick={handleInput}>
          Search
        </Button>
      </form>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  onSearch: PropTypes.func,
};
