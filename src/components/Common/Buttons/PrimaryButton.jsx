import React from "react";

const PrimaryButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-primary ${isLoading ? "loading" : ""}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
