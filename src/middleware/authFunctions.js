const jsonWebToken = require("jsonwebtoken");
const { accessSecret, refreshSecret } = require("../../config");

const generateToken = (user, secret, length) => {
  return jsonWebToken.sign(
    { username: user.username, uid: user.uid },
    secret,
    length
  );
};
const generateAccessToken = (user) => {
  return generateToken(user, accessSecret, { expiresIn: "2d" });
};
const generateRefreshToken = (user) => {
  return generateToken(user, refreshSecret, { expiresIn: "30d" });
};

module.exports = { generateAccessToken, generateRefreshToken };
