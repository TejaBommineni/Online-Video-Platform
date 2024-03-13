const { StatusCodes } = require("http-status-codes");
const { response } = require("../utils/response");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const ID = "AKIARXIPURKYWR5WUYWY";
const SECRET = "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";

// AWSAccessKeyId=AKIARXIPURKYWR5WUYWY
// AWSSecretKey=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

const BUCKET_NAME = "tejavideoapp";

const uploadFile = async (req, res) => {
  if (req.files === undefined || !req.files.image) {
    let msg = "No file found !";
    return response(res, StatusCodes.BAD_REQUEST, false, null, msg);
  }

  try {
    const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET,
    });

    const file = req.files.image;
    const fileFormat = file.name.split(".").pop();
    const fileName = uuidv4() + "." + fileFormat;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.data,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      return response(res, StatusCodes.ACCEPTED, true, fileName, null);
    });
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

module.exports = {
  uploadFile,
};
