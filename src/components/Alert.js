import React from "react";

import "../styles/alert.css";

const Alert = ({ message, success }) => {
  if (!message) return null;

  return (
    <div className={`alert-${success ? "success" : "error"}`}>
      <div className="alert-message">{message}</div>
    </div>
  );
};

export default Alert;
