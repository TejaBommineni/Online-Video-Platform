import React from "react";
import config from "../../../service/api/config";
import Rating from "react-rating";
import { EmptyStar, FullStar } from "../../VideoPage/Components/Stars";

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
              {video.ratings && video.ratings.length > 0 && (
                <Rating
                  emptySymbol={EmptyStar}
                  fullSymbol={FullStar}
                  initialRating={
                    video.ratings.reduce((sum, currentval) => {
                      return sum + currentval.rating;
                    }, 0) / video.ratings.length
                  }
                  readonly
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
