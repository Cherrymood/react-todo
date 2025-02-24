import { useState } from "react";
import Button from "/src/components/Button.jsx";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

export default function AddTodoForm({
  onAddTodo,
  onSearch,
  onSort,
  sortOrder,
}) {
  const [todoTitle, setTodoTitle] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isAddtitle, setisAddtitle] = useState(false);

  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
    setisAddtitle(true);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    if (todoTitle.trim() !== "") {
      const newTodoTitle = {
        id: Date.now(),
        title: todoTitle,
      };

      onAddTodo(newTodoTitle);

      setTodoTitle("");

      setisAddtitle(false);
    } else if (isAddtitle) {
      // alert("Please enter a valid todo title.");
      setisAddtitle(false);
    }
  }

  function handleInput() {
    setIsSearch(true);
  }

  function handleSearch(e) {
    e.preventDefault();
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

        <Button className="button-33" type="button" onClick={handleInput}>
          Search
        </Button>

        <Button className="button-33" type="button" onClick={onSort}>
          Sort({sortOrder === "asc" ? "Ascending" : "Descending"})
        </Button>
      </form>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  onSearch: PropTypes.func,
};
