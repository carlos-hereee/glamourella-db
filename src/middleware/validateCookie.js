const jwt = require("jsonwebtoken");
const { cookieName, accessSecret } = require("../../config");

module.exports = async (req, res, next) => {
  const token = req.cookies[cookieName];
  if (token === undefined || token === "undefined") {
    return res.status(400).json({ accessToken: "" });
  }
  let payload = jwt.verify(token, accessSecret);
  req.user = payload;
  next();
};
