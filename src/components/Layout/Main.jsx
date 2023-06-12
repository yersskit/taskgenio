import React from 'react';

const Main = ({ children }) => {
  return (
    <div className="w-full h-[calc(100%-50px)] overflow-hidden box-border py-[24px] flex flex-col gap-4">
      {children}
    </div>
  );
};

export default Main;
