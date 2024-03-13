const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const getVideoByUser = async (req, res) => {
  const { userId } = req.body;
  Video.find({ user: userId })
    .then((videos) => {
      if (videos) {
        return response(res, StatusCodes.OK, true, { videos: videos }, null);
      } else {
        return response(
          res,
          StatusCodes.NOT_FOUND,
          false,
          {},
          "No video Found!"
        );
      }
    })
    .catch((err) => {
      return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        {},
        err.message
      );
    });
};

module.exports = getVideoByUser;
