import { getApi, postApi, postFormData, postVideo, putApi } from "./api/index";

export const Registration = (data) => postApi("auth/register", data);
export const Login = (data) => postApi("auth/login", data);
export const GetUserProfile = (userID) => getApi(`user/${userID}`);
export const UpdateuserProfile = (userID, data) =>
  putApi(`user/update/${userID}`, data);

export const UploadFile = (file) => postFormData(`upload-file`, file);
export const UploadVideo = (file, setUploadPercentage) =>
  postVideo(`upload-file`, file, setUploadPercentage);

export const CreateVideo = (data) => postApi("video/create", data);
export const GetVideos = (data) => postApi("video", data);
export const GetVideoDetails = (slug) => getApi(`video/${slug}`);
export const GetVideoLikesCommentsCount = (id) =>
  getApi(`video/like-comment-share-count/${id}`);

export const LikeVideo = (videoID, userID) =>
  postApi(`video/like/${videoID}/${userID}`);
export const UnlikeVideo = (videoID, userID) =>
  postApi(`video/unlike/${videoID}/${userID}`);
export const DislikeVideo = (videoID, userID) =>
  postApi(`video/dislike/${videoID}/${userID}`);
export const RemoveDislike = (videoID, userID) =>
  postApi(`video/removedislike/${videoID}/${userID}`);

export const GetComments = (videoID) => getApi(`comment/${videoID}`);
export const CommentVideo = (videoID, data) =>
  postApi(`comment/${videoID}`, data);

export const updateComment = (commentID, userID, data) =>
  postApi(`comment/update/${commentID}/${userID}`, data);

export const DeleteComment = (commentID, userID) =>
  postApi(`comment/delete/${commentID}/${userID}`);

export const ReplyComment = (commentID, userID, data = {}) =>
  postApi(`comment/reply/${commentID}/${userID}`, data);

export const updateReply = (userID, data) =>
  postApi(`comment/updateReply/${userID}`, data);

export const DeleteReply = (userID, data = {}) =>
  postApi(`comment/deleteReply/${userID}`, data);

export const ShareVideo = (data) => postApi(`video/share`, data);

export const getUserVideos = (data) => postApi(`video/user`, data);

export const deleteVideo = (data) => postApi(`video/delete`, data);

export const UpdateVideo = (data) => postApi("video/update", data);

export const submitVideoRating = (data) => postApi("video/submitRating", data);

export const searchVideoFromKeyword = (data) =>
  postApi("video/searchVideoFromKeyword", data);
