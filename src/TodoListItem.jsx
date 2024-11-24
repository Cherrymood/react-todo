import PropTypes from "prop-types";

TodoListItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default function TodoListItem({ title }) {
  return <li className="todo-list-item ">{title}</li>;
}
