import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineLoading } from 'react-icons/ai';

const Loader = () => {
  const loadingCounter = useSelector((state) => state.loader.loadingCounter);

  if (loadingCounter === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 m-auto w-screen h-screen bg-black bg-opacity-40 z-20"></div>
      <div className="w-1/2 h1/2 flex items-center justify-center m-auto fixed top-0 bottom-0 right-0 left-0 z-20">
        <AiOutlineLoading className="text-4xl animate-spin" />
      </div>
    </>
  );
};

export default Loader;
