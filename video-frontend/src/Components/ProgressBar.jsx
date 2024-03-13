import React from "react";

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="h-2 w-full bg-gray-300">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full mb-2 ${
          progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
        }`}
      ></div>
      <div className="w-full text-gray-800 text-center">
        <h4 className="font-bold">{progressPercentage}%</h4>
      </div>
    </div>
  );
};

export default ProgressBar;
