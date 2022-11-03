const router = require("express").Router();
const { google } = require("googleapis");
const { calendarId, apiKey, contactFailed } = require("../../config");
const { authorize } = require("../middleware/calendar");

router.get("/", async (req, res) => {
  const { date } = req.params;
  try {
    res.status(201).json({ success: true, message: "found" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.get("/date/:date", async (req, res) => {
  const { date } = req.params;
  console.log("req.body", date);
  try {
    res.status(201).json({ success: true, message: "found" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.get("/events", async (req, res) => {
  try {
    const client = await authorize();
    const calendar = google.calendar({ version: "v3", auth: client });
    await calendar.events.list({ calendarId, apiKey }, (err, result) => {
      if (err) return;
      res.status(200).json({ success: true, data: result.data });
    });
  } catch (e) {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
