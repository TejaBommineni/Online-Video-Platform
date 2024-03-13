import React from "react";

const ComponentLoader = ({ height }) => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current   rounded-full";

  return (
    <div
      className="flex w-full flex-column justify-center text-center"
      style={{ height: height }}
    >
      <div className="flex justify-center">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
};

export default ComponentLoader;
