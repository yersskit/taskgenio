import React, { forwardRef } from "react";
import { HandleIcon } from "./HandleIcon";

export const Container = forwardRef(
  ({ children, handleProps, onClick, label, style }, ref) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        ref={ref}
        style={{
          ...style,
        }}
        className="flex flex-col w-full h-full box-border bg-base-200 rounded min-w-[140px]"
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="border-b-2 border-base-100 p-2 flex justify-between items-center text-base-content font-semibold">
          {label}
          <div className="flex flex-col gap-4">
            <HandleIcon {...handleProps} />
          </div>
        </div>
        <ul className="flex flex-col gap-2 p-2 overflow-y-auto h-full">
          {children}
        </ul>
      </Component>
    );
  }
);
