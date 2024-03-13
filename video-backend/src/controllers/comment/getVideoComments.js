const { StatusCodes } = require("http-status-codes");
const { Comment } = require("../../models/Comment.model");
const { User } = require("../../models/User.model");
const { response } = require("../../utils/response");

const getVideoComments = async (req, res, next) => {
  try {
    const videoID = req.params.videoID;

    const result = await Comment.find({ video: videoID })
      .populate([
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
      ])
      .sort({ createdAt: -1 });

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

module.exports = getVideoComments;
