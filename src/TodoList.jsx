import PropTypes from "prop-types";
import AddTodoForm from "./AddTodoForm";

const todoList = [
  { id: 1, title: "Add new task" },
  { id: 2, title: "Edit" },
  { id: 3, title: "Task done" },
];

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function TodoList() {
  return (
    <>
      <AddTodoForm />
      <UnorderedList />
    </>
  );
}

function UnorderedList() {
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
