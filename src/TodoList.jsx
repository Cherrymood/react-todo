import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="todo-list">
      {todoList.map((task) => {
        console.log(task);
        return (
          <TodoListItem key={task.id} todo={task} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
}
