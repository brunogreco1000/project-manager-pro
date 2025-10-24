"use client";

import { FC, RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";

export interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  valid: boolean;
  placeholder?: string;
  required?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  showValidIcon?: boolean;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  type,
  value,
  setValue,
  valid,
  placeholder,
  required,
  inputRef,
  showValidIcon = true,
}) => (
  <label className="flex flex-col">
    <span className="font-semibold">{label}</span>
    <div className="flex items-center border rounded px-2">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!valid}
        required={required}
        placeholder={placeholder}
        className="p-2 w-full outline-none bg-transparent"
      />
      {showValidIcon && (
        <FontAwesomeIcon
          icon={valid ? faCheck : value ? faTimes : faCircle}
          className={`ml-2 ${
            valid ? "text-green-500" : value ? "text-red-500" : "text-gray-400"
          }`}
        />
      )}
    </div>
  </label>
);

export default InputField;
