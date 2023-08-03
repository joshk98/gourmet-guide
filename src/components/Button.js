import React from "react";

const Button = ({ onDelete }) => {
  return (
    <div className="button">
      <button type="button" onClick={onDelete}>
        Delete Selected Recipe
      </button>
    </div>
  );
};

export default Button;
