const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const searchVideoFromKeyword = async (req, res) => {
  var { keyword } = req.body;
  Video.find({ $text: { $search: keyword } })
    .then((data) => {
      return response(res, StatusCodes.ACCEPTED, true, { videos: data }, null);
    })
    .catch((err) => {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        "Could not fetch videos!"
      );
    });
};

module.exports = searchVideoFromKeyword;
