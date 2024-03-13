const { response } = require("../utils/response");
const isValidMongoID = require("../utils/isValidMongoID");

const verifyUserID = (req, res, next) => {
  try {
    // check if the user id is a valid mongodb id or not
    if (!isValidMongoID(req.params.userID)) {
      return response(res, 400, false, {}, "Invalid user id");
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

module.exports = verifyUserID;
