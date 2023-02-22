import React from "react";

const CustomInput = ({
  title,
  name,
  value,
  type,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      <p className="text-red-500 text-xs italic">
        {error && !value ? error : null}
      </p>
    </div>
  );
};

export default CustomInput;
