import React from "react";
import { MANDATORY_INDICATOR, REQUIRED_FIELD } from "./../../utils/consts";
import { useTranslation } from "react-i18next";
import { inputSizes } from "../../utils/utils";

const TextInput = ({
  name,
  value,
  onChange,
  required,
  errors,
  setErrors,
  disabled,
  size,
}) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
    errorValidation(e.target.value);
  };

  const errorValidation = (value) => {
    let fieldErrors = [];
    if (required && value.trim().length === 0) fieldErrors.push(REQUIRED_FIELD);
    fieldErrors = [...new Set(fieldErrors)];
    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <label className="label w-full flex justify-start gap-[1px]">
        <span className="label-text">{t(`labels.${name}`)}</span>
        {required && (
          <span className="text-error text-xs">{MANDATORY_INDICATOR}</span>
        )}
      </label>
      <input
        disabled={disabled}
        autoComplete="none"
        type="text"
        placeholder={t(`labels.${name}`)}
        className={`input input-bordered w-full outline-none focus:outline-none focus:ring-2 focus:ring-secondary ${
          errors && errors.length > 0 ? "input-error" : ""
        } ${inputSizes[size] ?? inputSizes["md"]}`}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
      {errors && errors.length > 0 && (
        <div className="mt-1 flex flex-col justify-start items-end w-full box-border px-2 font-semibold">
          {errors.map((error, index) => (
            <p key={index} className="text-error text-xs">
              {t(`errors.${error}`)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextInput;
