import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen } from '../../store/tasks';

const TaskDetailDrawer = () => {
  const dispatch = useDispatch();
  const { drawerOpen, currentTask } = useSelector((state) => state.tasks);

  return (
    <>
      {drawerOpen ? (
        <div
          className="flex fixed w-screen h-screen bg-black bg-opacity-50 z-30"
          onClick={() => {
            dispatch(setDrawerOpen(false));
          }}></div>
      ) : null}
      <div
        className={`flex fixed right-0 top-0 bottom-0 my-auto transform transition-transform ease-in-out duration-300 w-2/5 bg-white z-40 rounded-l h-[95%] drop-shadow-xl ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {currentTask && (
          <div className="flex flex-col p-8 gap-4">
            <h1>{currentTask.title}</h1>
            <p className="text-base">{currentTask.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskDetailDrawer;
