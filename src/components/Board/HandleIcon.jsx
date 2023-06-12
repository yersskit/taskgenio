import React, { forwardRef } from 'react';
import { MdDragIndicator } from 'react-icons/md';

export const HandleIcon = forwardRef((props, ref) => {
  return (
    <button ref={ref} className="cursor-grab text-neutral-content" {...props}>
      <MdDragIndicator />
    </button>
  );
});
