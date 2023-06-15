import React from 'react';
// import AssignmentAvatar from './AssignmentAvatar';
import { TbNotebook } from 'react-icons/tb';
import { LuWorkflow } from 'react-icons/lu';
import { MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setCurrentTask, setDrawerOpen } from '../../store/tasks';

const ItemCard = ({ content }) => {
  const dispatch = useDispatch();

  const onClickTaskDetail = () => {
    dispatch(setDrawerOpen(true));
    dispatch(setCurrentTask(content));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-start">
        <p
          onClick={onClickTaskDetail}
          className="font-semibold text-base hover:underline cursor-pointer">
          {content.title}
        </p>
        <div className="text-sm text-accent-content bg-accent px-2 py-0.5 flex items-center justify-start gap-1">
          <MdStar className="mb-0.5 text-accent-focus" />
          <p className="text-xs font-semibold">Epic Name</p>
        </div>
      </div>
      <p className="text-sm">3 tasks</p>
      <div className="flex">
        <p className="px-4 py-0.5 bg-primary text-xs font-semibold rounded text-primary-content">
          UI
        </p>
      </div>
      <div className="flex justify-between items-end w-full">
        <div className="flex gap-4">
          <TbNotebook className="text-xl" />
          <LuWorkflow className="text-xl" />
        </div>
        {/* TODO: rework this to improve performance */}
        {/* <AssignmentAvatar content={content} /> */}
      </div>
    </div>
  );
};

export default ItemCard;
