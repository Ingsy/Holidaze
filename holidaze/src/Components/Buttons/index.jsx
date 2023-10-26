import React from "react";

const BaseButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} tabIndex="0">
      {children}
    </button>
  );
};

export default BaseButton;
