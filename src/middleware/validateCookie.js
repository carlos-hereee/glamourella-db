const jwt = require("jsonwebtoken");
const { cookieName, accessSecret } = require("../../config");

module.exports = async (req, res, next) => {
  const { accessToken } = req.cookies[cookieName];
  if (accessToken === undefined || accessToken === "undefined") {
    return res.status(400).json("");
  }
  console.log("token", accessSecret);
  let payload = jwt.verify(accessToken, accessSecret);
  req.user = payload;

  next();
};
