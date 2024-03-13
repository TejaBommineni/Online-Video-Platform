import React from "react";
import config from "../../../service/api/config";

const VideoCard = ({ video }) => {
  return (
    <div className=" rounded overflow-hidden border w-full bg-white ">
      <div
        className="w-full h-thumb bg-cover overflow-hidden"
        style={{
          backgroundImage: `url(${config.fileServer + video?.thumbnail})`,
        }}
      ></div>
      <div className="px-2 my-2 text-left">
        <div className="w-full flex justify-between ">
          <div className="flex">
            <div>
              <span className="ml-2 font-bold text-sm block">
                {video?.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
