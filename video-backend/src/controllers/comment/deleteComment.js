const { StatusCodes } = require("http-status-codes");
const { Comment } = require("../../models/Comment.model");
const { response } = require("../../utils/response");
const isValidMongoID = require("../../utils/isValidMongoID");

const deleteComment = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const commentID = req.params.commentID;

    // check if the comment id is a valid mongodb id or not
    if (!isValidMongoID(commentID)) {
      return response(res, 400, false, {}, "Invalid comment id");
    }

    const result = await Comment.deleteOne({ _id: commentID, user: userID });

    if (result.deletedCount === 0) {
      return response(
        res,
        404,
        false,
        { message: "Could not delete the comment!" },
        null
      );
    }

    return response(res, StatusCodes.OK, true, { ...result }, null);
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

module.exports = deleteComment;
