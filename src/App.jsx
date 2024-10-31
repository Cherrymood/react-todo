import PropTypes from "prop-types";

const todoList = [
  { id: 1, title: "Add new task" },
  { id: 2, title: "Edit" },
  { id: 3, title: "Task done" },
];

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  return (
    <div>
      <HeadingH1>Todo List</HeadingH1>
      <UnorderedList />
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
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
