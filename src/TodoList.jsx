import PropTypes from "prop-types";
import AddTodoForm from "./AddTodoForm";

TodoList.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
UnorderedList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function TodoList({ onAddTodo, todoList }) {
  return (
    <>
      <AddTodoForm onAddTodo={onAddTodo} />
      <UnorderedList todoList={todoList} />
    </>
  );
}

function UnorderedList({ todoList }) {
  return (
    <ul>
      {todoList.map((task) => (
        <ListItem key={task.id}>Title: {task.title}</ListItem>
      ))}
    </ul>
  );
}

function ListItem({ children }) {
  return <li>{children}</li>;
}
