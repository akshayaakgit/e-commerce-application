import React from "react";

const Input = ({ name, placeholder, value, onChange, type }) => {
  return (
    <input
      className="px-4 py-2 outline-none border-2 rounded-md border-transparent bg-slate-200 focus:border-slate-400
      hover:border-slate-400 my-2 w-full text-lg"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={event => {
        onChange(name, event.target.value);
      }}
    />
  );
};
export default Input;
