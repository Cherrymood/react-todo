import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function InputWithLabel({
  todoTitle,
  handleTitleChange,
  children,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children} </label>

      <input
        type="text"
        id="todoTitle"
        value={todoTitle} // Controlled component
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  InputWithLabel: PropTypes.func,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};
