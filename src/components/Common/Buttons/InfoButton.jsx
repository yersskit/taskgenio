import React from "react";

const InfoButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-info ${isLoading ? "loading" : ""}`}
    >
      {children}
    </button>
  );
};

export default InfoButton;
