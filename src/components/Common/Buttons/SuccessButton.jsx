import React from 'react';

const SuccessButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-success ${isLoading ? 'loading' : ''}`}
    >
      {children}
    </button>
  );
};

export default SuccessButton;
