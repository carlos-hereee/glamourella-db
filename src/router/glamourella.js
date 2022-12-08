const router = require("express").Router();
const { errMail } = require("../../config");
const {
  socials,
  about,
  schedule,
  services,
} = require("../content/content.config");
const validateCookie = require("../middleware/validateCookie");

router.get("/glamourella", async (req, res) => {
  try {
    res.status(200).json({ socials, about, services, schedule });
  } catch {
    res.status(500).json(errMail);
  }
});
router.get("/glamourella/admin", validateCookie, async (req, res) => {
  try {
    // res.status(200).json({ socials, about, services, schedule });
  } catch {
    res.status(500).json(errMail);
  }
});

module.exports = router;
