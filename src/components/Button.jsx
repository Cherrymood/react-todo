import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired, // Content inside the button
  onClick: PropTypes.func, // Optional click handler
};

export default function Button({ children, onClick }) {
  return (
    <button className="button-33" onClick={onClick}>
      {children}
    </button>
  );
}
