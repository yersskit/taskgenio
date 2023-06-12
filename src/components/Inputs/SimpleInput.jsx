import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { inputSizes } from './../../utils/utils';

const SimpleInput = ({ name, value, onChange, type, min, max, size }) => {
  const { t } = useTranslation();

  const onChangeInternal = (e) => {
    if (min && e.target.value < min) return;
    if (max && e.target.value > max) return;
    onChange(e);
  };

  return (
    <input
      min={min}
      max={max}
      autoComplete="none"
      type={type ?? 'text'}
      placeholder={t(`labels.${name}`)}
      className={`input input-bordered outline-none focus:outline-none focus:ring-2 focus:ring-neutral ${
        inputSizes[size] ?? inputSizes['md']
      }`}
      name={name}
      id={name}
      value={value}
      onChange={onChangeInternal}
    />
  );
};

export default SimpleInput;
