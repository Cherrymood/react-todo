export default function Button({ children, onClick }) {
  return (
    <button className="button-33" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  Button: PropTypes.func,
};
