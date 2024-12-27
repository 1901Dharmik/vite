import { FloatingLabel } from "flowbite-react";
import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname , value,onChange, onBlur, disabled} = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={ value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-control ${classname}`}
      />
    </div>
  );
};

export default CustomInput;
