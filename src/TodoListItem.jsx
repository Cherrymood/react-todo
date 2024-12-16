import PropTypes from "prop-types";
import Button from "/components/Button.jsx";

TodoListItem.propTypes = {
  todo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default function TodoListItem({ todo }) {
  return (
    <li className="todo-list-item">
      <span>{todo.title}</span>
      <Button>Remove</Button>
    </li>
  );
}
