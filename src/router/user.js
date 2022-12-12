const router = require("express").Router();
const Users = require("../models/users");
const registrationCred = require("../middleware/registration");
const validateCookie = require("../middleware/validateCookie");
const validateLogin = require("../middleware/validateLogin");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authFunctions");
const {
  cookieName,
  notFoundUser,
  errAlreadyExists,
  isDev,
} = require("../../config");

router.get("/", validateCookie, async (req, res) => {
  const user = await Users.findOne({ uid: req.user.uid });
  res.status(200).json(user);
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
    await new Users(req.user).save();
    res.cookie(cookieName, req.user.accessToken, { httpOnly: true });
    res.status(200).json({ accessToken: req.user.accessToken });
  } catch (err) {
    isDev && console.log("eerr", err);
    res.status(400).json(errAlreadyExists);
  }
});
router.post("/login", validateLogin, async (req, res) => {
  res.cookie(cookieName, req.token, { httpOnly: true });
  res.status(200).json({ accessToken: req.token });
});
router.post("/refresh-token", validateCookie, async (req, res) => {
  // token is valid and send an access token
  const accessToken = generateAccessToken(req.user);
  await Users.updateOne(
    { uid: req.user.uid },
    { refreshToken: generateRefreshToken(req.user), accessToken }
  );
  res.cookie(cookieName, accessToken, { httpOnly: true }).status(200);
  res.json({ accessToken });
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
