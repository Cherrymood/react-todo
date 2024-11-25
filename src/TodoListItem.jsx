import PropTypes from "prop-types";

TodoListItem.propTypes = {
  todo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default function TodoListItem({ todo }) {
  return <li className="todo-list-item ">{todo.title}</li>;
}
