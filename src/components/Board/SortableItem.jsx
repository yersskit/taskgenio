import { useSortable } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { Item } from "./Item";

const SortableItem = ({ disabled, id, index }) => {
  function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setIsMounted(true), 500);
      return () => clearTimeout(timeout);
    }, []);

    return isMounted;
  }

  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    />
  );
};

export default SortableItem;
