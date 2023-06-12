import React, { useState } from 'react';
import {
  ONE_LOWERCASE,
  ONE_NUMBER,
  ONE_SPECIAL_CHARACTER,
  ONE_UPPERCASE,
  MINIMUM_PASSWORD_CHARACTERS,
  MANDATORY_INDICATOR,
  REQUIRED_FIELD
} from '../../utils/consts';
import { useTranslation } from 'react-i18next';
import { inputSizes } from '../../utils/utils';

const PasswordInput = ({
  name,
  value,
  onChange,
  required,
  errors,
  setErrors,
  disabled,
  showConstraints,
  size
}) => {
  const { t } = useTranslation();
  const [valids, setValids] = useState([]);

  const constraints = {
    ONE_LOWERCASE,
    ONE_NUMBER,
    ONE_UPPERCASE,
    MINIMUM_PASSWORD_CHARACTERS,
    ONE_SPECIAL_CHARACTER
  };

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
    errorValidation(e.target.value);
  };

  const errorValidation = (value) => {
    let fieldErrors = [];
    const fieldValids = [];

    if (required && value.trim().length === 0) fieldErrors.push(REQUIRED_FIELD);

    if (showConstraints) {
      if (value.trim().length > 0) {
        fieldErrors.indexOf(REQUIRED_FIELD) !== -1 &&
          fieldErrors.splice(fieldErrors.indexOf(REQUIRED_FIELD), 1);

        const passwordRegexLowercase = /^(?=.*[a-z])/;
        const passwordRegexUppercase = /^(?=.*[A-Z])/;
        const passwordRegexNumber = /^(?=.*[0-9])/;
        const passwordRegexSpecial = /^(?=.*[!@#$%^&*])/;

        if (passwordRegexLowercase.test(value)) {
          fieldValids.push(ONE_LOWERCASE);
        } else {
          fieldErrors.push(ONE_LOWERCASE);
        }

        if (passwordRegexUppercase.test(value)) {
          fieldValids.push(ONE_UPPERCASE);
        } else {
          fieldErrors.push(ONE_UPPERCASE);
        }

        if (passwordRegexNumber.test(value)) {
          fieldValids.push(ONE_NUMBER);
        } else {
          fieldErrors.push(ONE_NUMBER);
        }

        if (passwordRegexSpecial.test(value)) {
          fieldValids.push(ONE_SPECIAL_CHARACTER);
        } else {
          fieldErrors.push(ONE_SPECIAL_CHARACTER);
        }

        if (value.length >= 8) {
          fieldValids.push(MINIMUM_PASSWORD_CHARACTERS);
        } else {
          fieldErrors.push(MINIMUM_PASSWORD_CHARACTERS);
        }
      }

      fieldErrors = [...new Set(fieldErrors)];
      fieldValids.push(...new Set(fieldValids));
      setValids(fieldValids);
    }

    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <label className="label w-full flex justify-start gap-[1px]">
        <span className="label-text">{t(`labels.${name}`)}</span>
        {required && <span className="text-error text-xs">{MANDATORY_INDICATOR}</span>}
      </label>
      <input
        disabled={disabled}
        autoComplete="none"
        type="password"
        placeholder={t(`labels.${name}`)}
        className={`input input-bordered w-full outline-none focus:outline-none focus:ring-2 focus:ring-secondary ${
          errors && errors.length > 0 && 'input-error'
        } ${inputSizes[size] ?? inputSizes['md']}`}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
      {showConstraints ? (
        <div className="mt-1 flex w-full flex-wrap box-border px-1 gap-x-4 gap-y-px justify-between">
          {Object.keys(constraints).map((constraint, i) => {
            return (
              <div className="flex whitespace-nowrap min-w-[45%] items-center gap-1" key={i}>
                <div
                  className={`w-[8px] h-[8px] rounded-full 
              ${
                errors && errors.includes(constraints[constraint])
                  ? 'bg-error'
                  : valids.includes(constraints[constraint])
                  ? 'bg-success'
                  : 'bg-neutral'
              } `}
                />
                <p className="text-[11px] text-neutral-400">
                  {t(`errors.${constraints[constraint]}`)}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        errors &&
        errors.length > 0 && (
          <div className="mt-1 flex flex-col justify-start items-end w-full box-border px-2 font-semibold">
            {errors.map((error, index) => (
              <p key={index} className="text-error text-xs">
                {t(`errors.${error}`)}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default PasswordInput;
