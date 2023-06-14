import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const SectionLoader = () => {
  return (
    <div>
      <div className="absolute top-0 bottom-0 right-0 left-0 m-auto w-full h-full bg-black bg-opacity-40 z-50"></div>
      <div className="w-full h-full flex items-center justify-center m-auto absolute top-0 bottom-0 right-0 left-0 z-60">
        <AiOutlineLoading className="text-[100px] animate-spin text-base-300" />
      </div>
    </div>
  );
};

export default SectionLoader;
