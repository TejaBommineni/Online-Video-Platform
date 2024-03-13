const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

//Create a Course
const submitRating = async (req, res) => {
  const { id, user, rating } = req.body;

  Video.findOne({ _id: id, "ratings.user": user }).then((videoData) => {
    if (videoData) {
      Video.updateOne(
        { _id: id, "ratings.user": user },
        { $set: { "ratings.$.rating": rating } }
      )
        .then((response) => {
          if (response.Modified > 0) {
            return response(res, StatusCodes.ACCEPTED, true, "Success", null);
          }
        })
        .catch((err) => {
          return response(
            res,
            StatusCodes.BAD_REQUEST,
            false,
            {},
            "Could not update the rating!"
          );
        });
    } else {
      Video.updateOne(
        { _id: id },
        { $push: { ratings: { user: user, rating: rating } } }
      )
        .then((response) => {
          if (response.Modified > 0) {
            return response(res, StatusCodes.ACCEPTED, true, "Success", null);
          }
        })
        .catch((err) => {
          return response(
            res,
            StatusCodes.BAD_REQUEST,
            false,
            {},
            "Could not update the rating!"
          );
        });
    }
  });
};

module.exports = submitRating;
