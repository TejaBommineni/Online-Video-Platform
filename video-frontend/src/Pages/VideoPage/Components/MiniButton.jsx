import React from "react";

const MiniButton = ({ icon, text, onClick = () => {} }) => {
  return (
    <button
      className="bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center text-xs mr-2"
      onClick={onClick}
    >
      <i className={`${icon} mr-1`}></i>
      <span>{text}</span>
    </button>
  );
};

export default MiniButton;
