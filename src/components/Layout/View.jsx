import React from "react";

const View = ({ children }) => {
  return <div className="flex flex-col gap-[24px] w-full h-full">{children}</div>;
};

export default View;
