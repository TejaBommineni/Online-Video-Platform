const { Router } = require("express");
const {
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
} = require("../controllers/video");

const verifyVideoID = require("../middlewares/verifyVideoID");
const verifyUserID = require("../middlewares/verifyUserID");

const router = Router();

//Video
router.post("/create", createVideo);
router.post("/", getVideos);
router.post("/user", getVideoByUser);
router.post("/update", updateVideo);
router.get("/:slug", getVideoDetails);

router.post("/like/:videoID/:userID", verifyVideoID, verifyUserID, likeVideo);
router.post(
  "/unlike/:videoID/:userID",
  verifyVideoID,
  verifyUserID,
  unLikeVideo
);
router.post(
  "/dislike/:videoID/:userID",
  verifyVideoID,
  verifyUserID,
  disLikeVideo
);
router.post(
  "/removedislike/:videoID/:userID",
  verifyVideoID,
  verifyUserID,
  removeDislike
);
router.post("/delete", deleteVideo);
router.post("/searchVideoFromKeyword", searchVideoFromKeyword);
router.post("/submitRating", submitRating);

module.exports = router;
