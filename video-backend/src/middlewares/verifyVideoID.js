const { response } = require("../utils/response");
const isValidMongoID = require("../utils/isValidMongoID");

const verifyVideoID = (req, res, next) => {
  try {
    // check if the video id is a valid mongodb id or not
    if (!isValidMongoID(req.params.videoID)) {
      return response(res, 400, false, {}, "Invalid video id");
    }

    next();
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

module.exports = verifyVideoID;
