const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { errAlreadyExists, isDev } = require("../../config");
const { v4 } = require("uuid");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("./authFunctions");

module.exports = async (req, res, next) => {
  try {
    let { username, email } = req.body;
    let user = await Users.find({ $or: [{ username }, { email }] });
    if (user.filter((i) => i.uid).length) {
      res.status(400).json(errAlreadyExists);
    } else {
      req.user = {
        uid: v4(),
        username: username ? username : req.body.email,
        email: email ? req.body.email : req.body.username,
        nickname: username ? username : req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isOnline: true,
        lastActiveAt: Date.now(),
      };
      req.user.refreshToken = generateRefreshToken(req.user);
      req.token = generateAccessToken(req.user);
      next();
    }
  } catch (err) {
    isDev && console.log("err", err);
    res.status(500).json({ message: "Servers are down" });
  }
};
