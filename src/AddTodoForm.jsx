import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AddTodoForm() {
  return (
    <>
      <from>
        <label htmlFor="todoTitle">Title</label>
        <input type="text" id="todoTitle" />

        <Button>Add</Button>
      </from>
    </>
  );
}

function Button({ children }) {
  return <button className="button-33">{children}</button>;
}
