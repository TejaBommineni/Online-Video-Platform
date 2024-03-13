import React from "react";
import { Link } from "react-router-dom";
import config from "../../../service/api/config";
import { edit } from "react-icons-kit/fa/edit";
import { trash } from "react-icons-kit/fa/trash";
import Icon from "react-icons-kit";
import { deleteVideo } from "../../../service/service";
import { toast } from "react-toastify";

const UserVideoCard = ({ video }) => {
  const removeVideo = () => {
    deleteVideo({ videoId: video._id })
      .then((res) => {
        console.log("res", res);
        if (res && res.isSuccess) {
          toast.success("Your video has been deleted");
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Your video could not be deleted");
      });
  };

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
          <div className="flex flex-column">
            <Link to={`video/${video.slug}`}>
              <div>
                <span className="ml-2 font-bold text-xl block mb-2">
                  {video?.title}
                </span>
                <p className="ml-2 text-sm block text-black mb-2">
                  <span className="font-bold">Description: </span>
                  {video?.description}
                </p>
                <p className="ml-2 text-sm block text-black mb-2">
                  <span className="font-bold">Categories: </span>
                  {video?.categories.join(", ")}
                </p>
              </div>
            </Link>
            <div className="flex mx-2 flex-row justify-around mt-4">
              <Link to={"/edit-video/" + video.slug}>
                <Icon className="cursor-pointer" icon={edit}></Icon>
              </Link>
              <Icon
                className="cursor-pointer"
                onClick={removeVideo}
                icon={trash}
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVideoCard;
