import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { Container } from './Container';

const DroppableContainer = ({ children, disabled, id, items, label }) => {
  const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const { attributes, isDragging, listeners, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: 'container',
      children: items
    },
    animateLayoutChanges
  });

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined
      }}
      handleProps={{
        ...attributes,
        ...listeners
      }}
      label={label}
    >
      {children}
    </Container>
  );
};

export default DroppableContainer;
