import React from 'react';

const WarningButton = ({ disabled, onClick, isLoading, children }) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-warning ${isLoading ? 'loading' : ''}`}
    >
      {children}
    </button>
  );
};

export default WarningButton;
