const router = require("express").Router();
const fs = require("fs");
const { google } = require("googleapis");
const {
  calendarId,
  clientEmail,
  apiKey,
  project,
  keyFile,
  scopes,
} = require("../../config");

const keys = JSON.parse(fs.readFileSync(keyFile));
const jwtClient = new google.auth.JWT(clientEmail, null, apiKey, scopes);
const calendar = google.calendar({ version: "v3", project, auth: jwtClient });
const auth = new google.auth.GoogleAuth({ keyFile, scopes, keys });

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
router.get("/accessToken", async (req, res) => {
  try {
    const a = await auth.getClient();
    // var calendarEvent = {
    //   summary: "Test Event added by Node.js",
    //   description: "This event was created by Node.js",
    //   start: {
    //     dateTime: "2022-06-03T09:00:00-02:00",
    //     timeZone: "Asia/Kolkata",
    //   },
    //   end: {
    //     dateTime: "2022-06-04T17:00:00-02:00",
    //     timeZone: "Asia/Kolkata",
    //   },
    //   attendees: [],
    //   reminders: {
    //     useDefault: false,
    //     overrides: [
    //       { method: "email", minutes: 24 * 60 },
    //       { method: "popup", minutes: 10 },
    //     ],
    //   },
    // };

    console.log("a", a);
    calendar.events.list({ calendarId }, (err, result) => {
      if (err) {
        console.log("something wrong ", err);
      } else {
        if (result.data.items.length > 0) {
          console.log("list", result.data.items);
        } else {
          console.log("no upcoming event ");
        }
      }
    });
    res.status(201).json({ success: true, message: "found" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
