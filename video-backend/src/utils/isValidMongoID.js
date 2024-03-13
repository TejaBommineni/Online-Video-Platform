const ObjectId = require("mongoose").Types.ObjectId;

/**
 *
 * @param {*} string checks if the string is a mongodb id or not
 * @returns true or false
 */
const isValidMongoID = (string) => {
  try {
    return string == new ObjectId(`${string}`);
  } catch (error) {
    return false;
  }
};

module.exports = isValidMongoID;
