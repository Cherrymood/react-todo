import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Button({ children }) {
  return <button className="button-33">{children}</button>;
}
