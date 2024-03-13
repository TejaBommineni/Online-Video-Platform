const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

const updateVideo = async (req, res) => {
  const { id, data } = req.body;
  const {
    title,
    description,
    thumbnail,
    activeStatus,
    chapterNumber,
    categories,
  } = data;
  let video = {};

  if (title) {
    video.title = title;
  }
  if (description) {
    video.description = description;
  }
  if (thumbnail) {
    video.thumbnail = thumbnail;
  }
  if (chapterNumber) {
    video.chapterNumber = chapterNumber;
  }
  if (activeStatus !== null) {
    video.activeStatus = activeStatus;
  }
  if (categories !== null && categories.length > 0) {
    video.categories = categories;
  }
  if (video) {
    video.updatedAt = new Date();
    try {
      const newVideo = await Video.findByIdAndUpdate(id, video, {
        new: true,
      }).exec();
      if (!newVideo) {
        return response(
          res,
          StatusCodes.BAD_REQUEST,
          false,
          {},
          "Could not update!"
        );
      }

      return response(
        res,
        StatusCodes.ACCEPTED,
        true,
        { video: newVideo },
        null
      );
    } catch (error) {
      return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        {},
        error.message
      );
    }
  } else {
    return response(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      {},
      "Could not update!"
    );
  }
};

module.exports = updateVideo;
