import React from 'react';

const ViewHeader = ({ title, name, children }) => {
  return (
    <div className="flex justify-start items-center px-8 gap-4 h-[36px]">
      <h1>{title}</h1>
      {name && (
        <h3 className="text-neutral-content bg-neutral px-6 py-1 box-border rounded">{name}</h3>
      )}
      <div className="flex justify-start items-center ml-auto gap-2">{children}</div>
    </div>
  );
};

export default ViewHeader;
