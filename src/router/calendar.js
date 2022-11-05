const router = require("express").Router();
const { google } = require("googleapis");
const {
  calendarId,
  apiKey,
  contactFailed,
  bookMessage,
} = require("../../config");
const { authorize } = require("../middleware/calendar");

// router.get("/", async (req, res) => {
//   const { date } = req.params;
//   try {
//     res.status(201).json({ success: true, message: "found" });
//   } catch {
//     res.status(500).json({ success: false, message: contactFailed });
//   }
// });
// router.get("/date/:date", async (req, res) => {
//   const { date } = req.params;
//   try {
//     res.status(201).json({ success: true, message: "found" });
//   } catch {
//     res.status(500).json({ success: false, message: contactFailed });
//   }
// });
router.get("/events", async (req, res) => {
  try {
    const client = await authorize();
    const calendar = google.calendar({ version: "v3", auth: client });
    calendar.events.list({ calendarId, apiKey }, (err, result) => {
      if (err) return;
      res.status(200).json({ success: true, events: result.data });
    });
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/book", async (req, res) => {
  try {
    const client = await authorize();
    const calendar = google.calendar({ version: "v3", auth: client });
    const data = req.body.content;
    calendar.events.update({ calendarId, eventId: data.id, resource: data });
    res.status(200).json({ success: true, message: bookMessage });
  } catch (e) {
    res.status(500).json({ success: false, message: contactFailed });
  }
});

module.exports = router;
