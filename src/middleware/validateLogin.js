const { userNotFound } = require("../../config");
const Users = require("../models/users");

module.exports = async (req, res, next) => {
  const user = await Users.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).json(userNotFound);
  } else {
    req.user = { ...req.body, ...user };
    next();
  }
};
