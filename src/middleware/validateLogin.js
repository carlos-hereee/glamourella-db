const { userNotFound, errCredentrial } = require("../../config");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./authFunctions");

module.exports = async (req, res, next) => {
  let { username, email, password } = req.body;
  const user = await Users.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    res.status(404).json(userNotFound);
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      req.user = user;
      // generate a new refreshToken
      await Users.updateOne(
        { uid: req.user.uid },
        { refreshToken: generateRefreshToken(req.user) }
      );
      req.token = generateAccessToken(req.user);
      next();
    } else {
      res.status(400).json(errCredentrial);
    }
  }
};
