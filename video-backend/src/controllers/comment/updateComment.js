const { StatusCodes } = require("http-status-codes");
const { Comment } = require("../../models/Comment.model");
const { User } = require("../../models/User.model");
const { response } = require("../../utils/response");
const isValidMongoID = require("../../utils/isValidMongoID");

const updateComment = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const commentID = req.params.commentID;

    if (!isValidMongoID(commentID)) {
      return response(res, 400, false, {}, "Invalid comment id");
    }

    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return response(res, 400, false, {}, "Text is required");
    }

    const comment = await Comment.findById(commentID);

    if (!comment || userID != comment.user) {
      return response(
        res,
        404,
        false,
        { message: "Could not delete the comment!" },
        null
      );
    }

    const result = await Comment.findByIdAndUpdate(
      commentID,
      {
        text,
      },
      {
        new: true,
      }
    ).populate([
      {
        path: "user",
        model: User,
        select: "-password",
      },
      {
        path: "replies",
        model: User,
        select: "-password",
        populate: [
          {
            path: "user",
            model: User,
            select: "-password",
          },
        ],
      },
    ]);

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

module.exports = updateComment;
