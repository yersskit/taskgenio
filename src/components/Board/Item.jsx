import React, { useEffect } from "react";
import styles from "./Item.module.css";

export const Item = React.memo(
  React.forwardRef(
    (
      {
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handleProps,
        height,
        index,
        listeners,
        sorting,
        style,
        transition,
        transform,
        value,
        ...props
      },
      ref
    ) => {
      return (
        <li
          className={`${[
            styles.ItemWrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
          ].join(
            " "
          )} drop-shadow-sm rounded text-sm bg-base-100 text-base-content`}
          style={{
            transition: transition,
            "--translate-x": transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            "--translate-y": transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
            "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
            "--index": index,
          }}
          ref={ref}
        >
          <div
            className={`${[
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
            ].join(" ")} flex flex-col items-start`}
            style={style}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
          >
            {value}
          </div>
        </li>
      );
    }
  )
);
