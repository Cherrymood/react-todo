import PropTypes from "prop-types";

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default function ListItem({ children }) {
  return <li>{children}</li>;
}
