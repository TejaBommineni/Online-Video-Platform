import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import TopBar from "../../Components/Menu/MenuBar";
import ComponentLoader from "../../Components/Progress/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import Rating from "react-rating";
import { EmptyStar, FullStar } from "./Components/Stars";
import config from "../../service/api/config";
import {
  GetVideoDetails,
  LikeVideo,
  UnlikeVideo,
  DislikeVideo,
  RemoveDislike,
  submitVideoRating,
} from "../../service/service";
import Comments from "./Components/Comments";
import ShareVideo from "./Components/ShareVideo";

const VideoPage = (props) => {
  const { match } = props;
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);

  const [likedVideo, setLikedVideo] = useState(false);
  const [shouldLike, setShouldLike] = useState(false);
  const [disLikedVideo, setDisLikedVideo] = useState(false);
  const [shouldDisLike, setShouldDisLike] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const { slug } = match.params;

  const handleRating = (e) => {
    submitVideoRating({ id: videoData._id, user: user._id, rating: e });
  };

  // Get video data
  useEffect(() => {
    (async () => {
      if (user && user._id) {
        const response = await GetVideoDetails(slug);

        if (response && response.isSuccess) {
          setVideoData(response.data.video);

          if (response.data?.video?.likes?.includes(user._id)) {
            setLikedVideo(true);
          }
          if (response.data?.video?.dislikes?.includes(user._id)) {
            setDisLikedVideo(true);
          }
        }
        setLoading(false);
      }
      var elem = document.getElementsByTagName("video")[0];
      if (elem) {
        elem.ontimeupdate = function () {
          if (elem.currentTime / elem.duration > 0.3) {
            setShowRating(true);
            return;
          }
        };
      }
    })();
  }, [slug, user]);

  // Like or Unlike the video
  useEffect(() => {
    (async () => {
      if (shouldLike && user && videoData) {
        setDisLikedVideo(false);
        if (!likedVideo) {
          const response = await LikeVideo(videoData._id, user._id);

          setVideoData(response.data.result);

          if (response && response.isSuccess) {
            setShouldLike(false);
            setLikedVideo(true);
          }
        } else {
          const response = await UnlikeVideo(videoData._id, user._id);

          setVideoData(response.data.result);

          if (response && response.isSuccess) {
            setShouldLike(false);
            setLikedVideo(false);
          }
        }
      }
    })();
  }, [likedVideo, shouldLike, videoData, user]);

  // Dislike the video
  useEffect(() => {
    (async () => {
      if (shouldDisLike && user && videoData) {
        setLikedVideo(false);
        if (!disLikedVideo) {
          const response = await DislikeVideo(videoData._id, user._id);

          setVideoData(response.data.result);

          if (response && response.isSuccess) {
            setShouldDisLike(false);
            setDisLikedVideo(true);
          }
        } else {
          const response = await RemoveDislike(videoData._id, user._id);
          setVideoData(response.data.result);
          if (response && response.isSuccess) {
            setShouldDisLike(false);
            setDisLikedVideo(false);
          }
        }
      }
    })();
  }, [disLikedVideo, shouldDisLike, videoData, user]);

  if (!authLoading && !user) {
    return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
  }

  return (
    <div>
      <TopBar active="" />
      <div className="flex flex-wrap justify-center">
        <div className="max-w-7xl w-full">
          {loading ? (
            <ComponentLoader height="90vh" />
          ) : (
            <div className="flex flex-wrap justify-center py-5 ">
              <div className="w-full lg:w-8/12 px-2">
                <video
                  className="w-full"
                  src={`${config.fileServer}${videoData?.video}`}
                  controls
                ></video>

                <div className="mt-3">
                  <span className="font-bold text-lg block">
                    {videoData?.title}
                  </span>
                  {videoData.ratings && videoData.ratings.length > 0 && (
                    <div>
                      <p>Average rating</p>
                      <Rating
                        emptySymbol={EmptyStar}
                        fullSymbol={FullStar}
                        initialRating={
                          videoData.ratings.reduce((sum, currentval) => {
                            return sum + currentval.rating;
                          }, 0) / videoData.ratings.length
                        }
                        readonly
                      />
                    </div>
                  )}
                  {(showRating ||
                    videoData.ratings.filter((v) => v.user == user._id)[0]) && (
                    <div>
                      <p>Your rating</p>
                      <Rating
                        onClick={(e) => {
                          handleRating(e);
                        }}
                        initialRating={
                          videoData.ratings.filter((v) => v.user == user._id)[0]
                            ?.rating
                        }
                        emptySymbol={EmptyStar}
                        fullSymbol={FullStar}
                      />
                    </div>
                  )}
                  <div className="flex mt-2 border-b pb-2 border-gray-400">
                    <div className="ml-2 font-medium flex-grow-1">
                      <span className="text-sm text-gray-600 font-medium w-full block">
                        {videoData.user?.name}
                      </span>
                      <span className="text-sm text-gray-400 font-medium w-full block">
                        {videoData.createdAt.toString().slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col align-items-center text-center">
                        <span
                          className={`mx-2 flex`}
                          role="button"
                          onClick={() => {
                            setShouldLike(true);
                          }}
                        >
                          <i
                            className={`bx ${
                              likedVideo === true ? "bxs-like" : "bx-like"
                            }`}
                            style={{
                              fontSize: "24px",
                              color: "#000",
                            }}
                          ></i>
                        </span>
                        <div className="likes-count text-xs">
                          {videoData?.likes?.length}
                        </div>
                      </div>
                      <div className="flex flex-col align-items-center text-center">
                        <span
                          className={`mx-2 flex`}
                          role="button"
                          onClick={() => {
                            setShouldDisLike(true);
                          }}
                        >
                          <i
                            className={`bx ${
                              disLikedVideo === true
                                ? "bxs-dislike"
                                : "bx-dislike"
                            }`}
                            style={{
                              fontSize: "24px",
                              color: "#000",
                            }}
                          ></i>
                        </span>
                        <div className="likes-count text-xs">
                          {videoData?.dislikes?.length}
                        </div>
                      </div>

                      <ShareVideo videoData={videoData} />
                    </div>
                  </div>
                  <span className="text-sm text-justify text-gray-600 w-full block my-2">
                    {videoData?.description}
                  </span>
                  <Comments videoData={videoData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
