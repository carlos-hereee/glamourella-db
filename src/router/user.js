const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const registrationCred = require("../middleware/registration");
const { generateAccessToken } = require("../middleware/authFunctions");
const validateCookie = require("../middleware/validateCookie");
const { cookieName, notFoundUser, notFound } = require("../../config");

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
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  user.uid = uuidv4();
  user.nickname = user.username;
  user.isOnline = true;
  try {
    const newUser = await new Users(user).save();
    // const refreshToken = generateRefreshToken(newUser);
    const accessToken = generateAccessToken(newUser);
    res.cookie(cookieName, accessToken, { httpOnly: true });
    res.status(200).json({ user: newUser, accessToken });
  } catch (e) {
    res.status(400).json(errMakeUser);
  }
});
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) {
      // const refreshToken = generateRefreshToken(user);
      const accessToken = generateAccessToken(user);
      res.status(200).cookie(cookieName, accessToken, { httpOnly: true });
      res.json({ user, accessToken: accessToken });
    } else {
      res.status(400).json(errCredentrial);
    }
  } catch {
    res.status(404).json(notFound);
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
