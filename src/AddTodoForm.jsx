import Button from "../public/components/Button";
import PropTypes from "prop-types";

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default function AddTodoForm({ onAddTodo }) {
  function handleAddTodo(e) {
    e.preventDefault();

    const newToDoList = e.target.elements.todoTitle.value.trim();
    console.log(e.target.elements.todoTitle.value.trim());

    const newToDoItem = {
      id: Date.now(),
      title: newToDoList,
    };
    console.log(newToDoItem);

    onAddTodo(newToDoItem);
    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>

        <input type="text" id="todoTitle" />

        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
