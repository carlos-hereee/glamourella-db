const router = require("express").Router();
const { contactFailed } = require("../../config");

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    res.status(201).json({ success: true, message: "created" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});

module.exports = router;
