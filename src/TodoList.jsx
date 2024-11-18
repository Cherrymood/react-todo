import PropTypes from "prop-types";
import ListItem from "./TodoListItem";

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
    <ul>
      {todoList.map((task) => (
        <ListItem key={task.id}>Title: {task.title}</ListItem>
      ))}
    </ul>
  );
}
