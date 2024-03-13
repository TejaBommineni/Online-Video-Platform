const { StatusCodes } = require("http-status-codes");
const { Comment } = require("../../models/Comment.model");
const { User } = require("../../models/User.model");
const { response } = require("../../utils/response");
const isValidMongoID = require("../../utils/isValidMongoID");

const deleteReply = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const replyID = req.body.replyID;

    if (!isValidMongoID(replyID)) {
      return response(res, 400, false, {}, "Invalid reply id");
    }

    const result = await Comment.findOneAndUpdate(
      {
        "replies._id": replyID,
        "replies.user": userID,
      },
      {
        $pull: { replies: { _id: replyID } },
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

module.exports = deleteReply;
