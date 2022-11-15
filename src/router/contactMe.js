const router = require("express").Router();
const { errMail } = require("../../config");

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  // console.log("req.body", req.body);
  try {
    res.status(201).json(successMail);
  } catch {
    res.status(500).json(errMail);
  }
});

module.exports = router;
