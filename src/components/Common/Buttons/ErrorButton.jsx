import React from "react";

const ErrorButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-error text-error-content hover:bg-opacity-90 ${
        isLoading ? "loading" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ErrorButton;
