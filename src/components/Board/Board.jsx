import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  PointerSensor,
  TouchSensor,
  useSensors,
  useSensor,
  MeasuringStrategy,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';

import DroppableContainer from './DroppableContainer';
import SortableItem from './SortableItem';
import ContainerDragOverlay from './ContainerDragOverlay';
import ItemDragOverlay from './ItemDragOverlay';

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
};

const MultipleContainers = ({ items, setItems, modifiers }) => {
  const [containers, setContainers] = useState(Object.keys(items));
  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => container.id in items)
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && containerItems.some((item) => item.id === container.id)
              )
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    })
  );

  const findContainer = (id) => {
    if (Object.keys(items).includes(id)) {
      return id;
    }

    let containerId = null;

    for (let i = 0; i < Object.keys(items).length; i++) {
      const key = Object.keys(items)[i];

      containerId = items[key].find((item) => item.id === id);
      if (containerId) {
        containerId = key;
        break;
      }
    }

    return containerId;
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        let data = items[findContainer(active.id)];
        let content = data.find((item) => item.id === active.id);

        setActiveData(content.data);
      }}
      onDragOver={({ active, over }) => {
        const overId = over && over.id ? over.id : null;

        if (overId === null || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.findIndex((item) => item.id === overId);
            const activeIndex = activeItems.findIndex((item) => item.id === active.id);

            let newIndex;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter((item) => item.id !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length)
              ]
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].findIndex((item) => item.id === active.id);
          const overIndex = items[overContainer].findIndex((item) => item.id === overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
          }
        }

        setActiveId(null);
      }}
      modifiers={modifiers}>
      <div className="flex gap-4 w-full h-full overflow-x-auto">
        <SortableContext items={[...containers]} strategy={horizontalListSortingStrategy}>
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={`${containerId}`}
              items={items[containerId]}>
              <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
                {items[containerId].map((item, index) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={item.id}
                      id={item.id}
                      index={index}
                      content={item.data}
                    />
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
          {activeId &&
            (containers.includes(activeId) ? (
              <ContainerDragOverlay containerId={activeId} items={items} />
            ) : (
              activeData && <ItemDragOverlay id={activeId} content={activeData} />
            ))}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default MultipleContainers;
