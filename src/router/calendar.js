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
    calendar.events.list({ calendarId, apiKey }, (err, result) => {
      // console.log("err", err);
      if (err) return;
      console.log("result", result);
      res.status(200).json({ success: true, events: result.data });
    });
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/book", (req, res) => {
  console.log("req.body", req.body);
});

module.exports = router;
