import PropTypes from "prop-types";

const todoList = [
  { id: 1, title: "Add new task" },
  { id: 2, title: "Edit" },
  { id: 3, title: "Task done" },
];

Heading.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  return (
    <div>
      <Heading>Todo List</Heading>
      <UnorderedList />
    </div>
  );
}

function Heading({ children }) {
  return <h1>{children}</h1>;
}

function UnorderedList() {
  return (
    <ul>
      {todoList.map((task) => (
        <List key={task.id}>
          Id: {task.id}, Task: {task.title}
        </List>
      ))}
    </ul>
  );
}

function List({ children }) {
  return <li>{children}</li>;
}
