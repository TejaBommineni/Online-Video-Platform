const createVideo = require("./createVideo");
const getVideos = require("./getVideos");
const getVideoDetails = require("./getVideoDetails");
const updateVideo = require("./updateVideo");
const getVideoByUser = require("./getVideoByUser");
const likeVideo = require("./likeVideo");
const unLikeVideo = require("./unLikeVideo");
const disLikeVideo = require("./disLikeVideo");
const removeDislike = require("./removeDislike");
const deleteVideo = require("./deleteVideo");
const searchVideoFromKeyword = require("./searchVideoFromKeyword");
const submitRating = require("./submitRating");

module.exports = {
  createVideo,
  getVideos,
  getVideoDetails,
  updateVideo,
  getVideoByUser,
  likeVideo,
  unLikeVideo,
  disLikeVideo,
  removeDislike,
  deleteVideo,
  searchVideoFromKeyword,
  submitRating,
};
