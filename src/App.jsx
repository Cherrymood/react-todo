import PropTypes from "prop-types";
import TodoList from "./TodoList.jsx";

HeadingH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  return (
    <div className="app">
      <HeadingH1>Todo List</HeadingH1>
      <TodoList />
    </div>
  );
}

function HeadingH1({ children }) {
  return <h1>{children}</h1>;
}
