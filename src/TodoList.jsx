import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function TodoList({ todoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((task) => (
        <TodoListItem key={task.id} todo={task} />
      ))}
    </ul>
  );
}
