const { StatusCodes } = require("http-status-codes");
const { Video } = require("../../models/Video.model");
const { response } = require("../../utils/response");

//Create a Course
const createVideo = async (req, res) => {
  const {
    title,
    description,
    video,
    categories,
    thumbnail,
    user,
    activeStatus,
  } = req.body;

  if (
    !title ||
    !description ||
    !thumbnail ||
    !video ||
    !categories ||
    categories.length == 0
  ) {
    return response(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      {},
      "Please Provide all information"
    );
  }

  const slug =
    title
      .replace(/\s+/g, "-")
      .replace(/\//g, "-")
      .replace(/&/g, "n")
      .toLowerCase() +
    "-" +
    Math.floor(Math.random() * 1000000000).toString(36) +
    Math.floor(Math.random() * 1000000000).toString(36) +
    Math.floor(Math.random() * 1000000000).toString(36);

  try {
    const newVideo = await Video.create({
      title: title,
      description: description,
      thumbnail: thumbnail,
      video: video,
      slug: slug,
      categories: categories,
      activeStatus: activeStatus,
      user: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newVideo) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        "Could not create video"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, { video: newVideo }, null);
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

module.exports = createVideo;
