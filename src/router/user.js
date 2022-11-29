const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const registrationCred = require("../middleware/registration");
const { generateAccessToken } = require("../middleware/authFunctions");
const validateCookie = require("../middleware/validateCookie");
const {
  cookieName,
  notFoundUser,
  errAlreadyExists,
  isDev,
} = require("../../config");
const findUser = require("../middleware/validateLogin");

router.get("/", validateCookie, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/:uid", validateCookie, async (req, res) => {
  try {
    const data = await Users.findOne({ uid: req.params.uid });
    if (data) {
      res.status(200).json({ data });
    }
  } catch {
    res.status(404).json(notFoundUser);
  }
});
router.post("/register", registrationCred, async (req, res) => {
  try {
    const newUser = await new Users(req.user).save();
    // const refreshToken = generateRefreshToken(newUser);
    const accessToken = generateAccessToken(newUser);
    res.cookie(cookieName, accessToken, { httpOnly: true });
    res.status(200).json({ user: newUser, accessToken });
  } catch (err) {
    isDev && console.log("e", err);
    res.status(400).json(errAlreadyExists);
  }
});
router.post("/login", findUser, async (req, res) => {
  if (bcrypt.compareSync(password, req.user.password)) {
    // const refreshToken = generateRefreshToken(req.user);
    const accessToken = generateAccessToken(req.user);
    res.status(200).cookie(cookieName, accessToken, { httpOnly: true });
    res.json({ user: req.user, accessToken: accessToken });
  } else {
    res.status(400).json(errCredentrial);
  }
});
router.post("/refresh-token", validateCookie, async (req, res) => {
  // token is valid and send an access token
  const accessToken = generateAccessToken(req.user);
  res.cookie(cookieName, accessToken, { httpOnly: true }).status(200);
  res.json({ accessToken: accessToken, user: req.user });
});
router.delete("/logout", validateCookie, async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
    }
    res.clearCookie(cookieName);
    res.status(202).json(successfulLogout);
  } catch {
    res.status(400).json(errLogout);
  }
});

module.exports = router;
