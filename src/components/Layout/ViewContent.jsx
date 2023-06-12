import React from 'react';

const ViewContent = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden w-full h-full overflow-y-auto px-8">
      {children}
    </div>
  );
};

export default ViewContent;
