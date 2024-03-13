const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

//Get All Courses
const getVideos = async (req, res) => {
  const { searchKey, user, sortBy, limit, skip } = req.body;

  try {
    const videosCount = await Video.countDocuments()
      .where(
        searchKey
          ? {
              $or: [
                {
                  title: { $regex: searchKey, $options: "i" },
                },
              ],
            }
          : null
      )
      .where(user ? { user: user } : null);

    const videos = await Video.find()
      .where(
        searchKey
          ? {
              $or: [
                {
                  title: { $regex: searchKey, $options: "i" },
                },
              ],
            }
          : null
      )
      .populate("user", "name email activeStatus photo")
      .where(user ? { user: user } : null)
      .sort(sortBy ? { [sortBy.field]: [sortBy.order] } : { createdAt: -1 })
      .limit(limit ? limit : null)
      .skip(skip ? skip : null);

    if (!videos || videos.length === 0) {
      return response(res, StatusCodes.NOT_FOUND, false, {}, "No videos Found");
    }

    return response(
      res,
      StatusCodes.OK,
      true,
      { videosCount: videosCount, videos: videos },
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
};

module.exports = getVideos;
