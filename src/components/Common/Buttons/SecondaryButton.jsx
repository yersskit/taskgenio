import React from "react";

const SecondaryButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-outline hover:bg-opacity-90`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
