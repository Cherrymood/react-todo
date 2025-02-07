import Button from "/src/components/Button.jsx";
import styles from "./ToDoListItem.module.css";
import PropTypes from "prop-types";

export default function TodoListItem({ todo, onRemoveTodo }) {
  // console.log("TodoListItem", todo);
  return (
    <li className={`${styles.ListItem} todo-list-item`}>
      <span>{todo.title}</span>
      <Button onClick={() => onRemoveTodo(todo.id)}>Remove</Button>
    </li>
  );
}

TodoListItem.propTypes = {
  TodoListItem: PropTypes.func,
};
