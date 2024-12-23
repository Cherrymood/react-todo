import PropTypes from "prop-types";
import Button from "/src/components/Button.jsx";

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired, // onRemoveTodo is required here
};

export default function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className="todo-list-item">
      <span>{todo.title}</span>
      <Button onClick={() => onRemoveTodo(todo.id)}>Remove</Button>
    </li>
  );
}
