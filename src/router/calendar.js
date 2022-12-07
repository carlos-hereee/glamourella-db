const router = require("express").Router();
const { google } = require("googleapis");
const {
  apiKey,
  contactFailed,
  bookMessage,
  bookingNotFound,
} = require("../../config");
const {
  authorize,
  findCalendarEvents,
  createNewCalendar,
} = require("../middleware/calendar");
const Event = require("../models/events");

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

router.get("/events", findCalendarEvents, async (req, res) => {
  try {
    res.status(200).json(req.events);
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
});
// router.get("/events", async (req, res) => {
//   try {
//     const client = await authorize();
//     const calendar = google.calendar({ version: "v3", auth: client });
//     calendar.events.list({ calendarId, apiKey }, (err, result) => {
//       if (err) return;
//       console.log("data", result.data);
//       res.status(200).json({ success: true, events: result.data });
//     });
//   } catch (e) {
//     console.log("e", e);
//     res.status(500).json({ success: false, message: contactFailed });
//   }
// });

router.post("/create-calendar", async (req, res) => {
  const calendarId = req.headers.calendarid;
  let calendar = {
    calendarId,
    uid: v4(),
    name: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, voluptatum.",
  };
  const data = createNewCalendar(calendar);
  if (data.length) {
    res.status(200).json(data);
  } else res.status(404).json("not found");
});
router.post("/book", async (req, res) => {
  const data = req.body;
  try {
    // check if the event is still open
    const event = await Event.findOne({ uid: req.body.id });
    // if its open add client to event
    if (event) {
      res.status(200).json({ success: true, message: bookMessage });
      // else event is not availible anymore not notify client to pick a different choice
    } else res.status(404).json({ success: false, message: bookingNotFound });
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/add-to-google-cal", async (req, res) => {
  try {
    const calendarId = req.headers.calendarid;
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
