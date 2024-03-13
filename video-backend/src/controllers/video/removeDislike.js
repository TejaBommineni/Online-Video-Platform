const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const removeDislike = async (req, res, next) => {
  try {
    const videoID = req.params.videoID;
    const userID = req.params.userID;

    const result = await Video.findByIdAndUpdate(
      videoID,
      {
        $pull: { dislikes: userID },
      },
      {
        new: true,
      }
    ).populate("user", "-password");

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

module.exports = removeDislike;
