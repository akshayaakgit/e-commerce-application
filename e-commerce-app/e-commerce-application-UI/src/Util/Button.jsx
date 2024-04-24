import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className="px-8 py-2 m-4 rounded-md text-white bg-orange-600 w-full text-xl font-semibold"
    >
      {text}
    </button>
  );
};

export default Button;
