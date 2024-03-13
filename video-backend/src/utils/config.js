const { sign } = require("jsonwebtoken");

const config = {
  secrets: {
    jwt: "tejaVideosSecretAuth",
    jwtExp: "70d",
  },
};

const createToken = (user) => {
  return sign(
    {
      _id: user._id,
      email: user.email,
      photo: user.photo,
      name: user.name,
    },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};

module.exports = { createToken, config };
