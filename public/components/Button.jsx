import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Button({ children, type }) {
  return <button className="button-33">{children}</button>;
}
