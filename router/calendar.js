const router = require("express").Router();
const { contactFailed } = require("./message.config");

router.get("/:date", async (req, res) => {
  const { date } = req.params;
  console.log("req.body", date);
  try {
    res.status(201).json({ success: true, message: "found" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});

module.exports = router;
