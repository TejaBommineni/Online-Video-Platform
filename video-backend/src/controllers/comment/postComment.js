const { StatusCodes } = require("http-status-codes");
const { Comment } = require("../../models/Comment.model");
const { response } = require("../../utils/response");
const isValidMongoID = require("../../utils/isValidMongoID");

const postComment = async (req, res, next) => {
  try {
    const videoID = req.params.videoID;

    const { userID, text } = req.body;

    if (!text || text.trim().length === 0) {
      return response(res, 400, false, {}, "Comment text is required");
    }

    if (!isValidMongoID(userID)) {
      return response(res, 400, false, {}, "Invalid user id");
    }

    const result = await Comment.create({
      text,
      video: videoID,
      user: userID,
    });

    return response(res, StatusCodes.OK, true, { result }, null);
  } catch (error) {
    console.log(error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      error.message
    );
  }
};

module.exports = postComment;
