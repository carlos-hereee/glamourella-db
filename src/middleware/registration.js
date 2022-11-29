const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { errAlreadyExists } = require("../../config");
const { v4 } = require("uuid");

module.exports = async (req, res, next) => {
  try {
    let { username, email } = req.body;
    let user = await Users.find({ $or: [{ username }, { email }] });
    if (user.filter((i) => i.uid).length) {
      res.status(400).json(errAlreadyExists);
    } else {
      req.user = {
        uid: v4(),
        username: req.body.email,
        email: req.body.email,
        nickname: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isOnline: true,
      };
      next();
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Servers are down" });
  }
};
