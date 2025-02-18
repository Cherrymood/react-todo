import PropTypes from "prop-types";
import Button from "./Button";

export default function SearchList({ filteredTodos }) {
  return (
    <div>
      {filteredTodos.length > 0 && (
        <>
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

SearchList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onReturn: PropTypes.func.isRequired,
};
