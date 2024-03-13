const { Router } = require("express");
const verifyVideoID = require("../middlewares/verifyVideoID");
const verifyUserID = require("../middlewares/verifyUserID");

const {
  postComment,
  getVideoComments,
  deleteComment,
  postReply,
  deleteReply,
  updateComment,
  updateReply,
} = require("../controllers/comment");

const router = Router();

// Post a comment
router.get("/:videoID", verifyVideoID, getVideoComments);
router.post("/:videoID", verifyVideoID, postComment);
router.post("/delete/:commentID/:userID", verifyUserID, deleteComment);
router.post("/update/:commentID/:userID", verifyUserID, updateComment);

router.post("/reply/:commentID/:userID", verifyUserID, postReply);
router.post("/updateReply/:userID", verifyUserID, updateReply);
router.post("/deleteReply/:userID", verifyUserID, deleteReply);

module.exports = router;
