const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const getVideoDetails = async (req, res) => {
  const { slug } = req.params;

  try {
    const video = await Video.findOne({ slug: slug }).populate("user");

    if (!video) {
      return response(res, StatusCodes.NOT_FOUND, false, {}, "No video Found!");
    }

    return response(res, StatusCodes.OK, true, { video: video }, null);
  } catch (error) {
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      error.message
    );
  }
};

module.exports = getVideoDetails;
