import React, { ChangeEvent } from "react";

interface TextInputProps {
  type: string;
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  id,
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full mx-auto mt-3 p-4 border rounded-lg border-gray-300 bg-white mb-3 relative">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-3"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="rounded w-full text-gray-700"
        required
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

export default TextInput;
