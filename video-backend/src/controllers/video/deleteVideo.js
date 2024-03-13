const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const deleteVideo = async (req, res) => {
  const { videoId } = req.body;
  Video.deleteOne({ _id: videoId })
    .then((response1) => {
      if (response1.deletedCount > 0) {
        return response(res, StatusCodes.OK, true, {}, null);
      } else {
        return response(
          res,
          StatusCodes.NOT_FOUND,
          false,
          {},
          "Video could not be deleted"
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

module.exports = deleteVideo;
