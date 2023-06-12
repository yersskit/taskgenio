import React, { useState, useEffect } from "react";
import SimpleInput from "./SimpleInput";

const DebouncedInput = ({
  name,
  value: initialValue,
  onChange,
  debounce = 500,
  type,
  min,
  max,
  size,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SimpleInput
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      min={min}
      max={max}
      size={size}
    />
  );
};

export default DebouncedInput;
