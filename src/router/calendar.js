const router = require("express").Router();
const { contactFailed } = require("./message.config");
const { google } = require("googleapis");
const axios = require("axios");
const keyFile = require("./keys.json");

const calendarId = process.env.CALENDAR_ID;
const apiKey = process.env.CALENDAR_API_AKEY;
const accessToken = process.env.CALENDAR_ACCESS_TOKEN;
const clientUrl = process.env.CLIENT_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientEmail = process.env.CLIENT_EMAIL;
const projectNumber = process.env.PROJECT_NUMBER;
const projectId = process.env.PROJECT_ID;
const scope = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

const jwtClient = new google.auth.JWT(clientEmail, null, apiKey, scope);
const calendar = google.calendar({
  version: "v3",
  project: projectNumber,
  auth: jwtClient,
});
const auth = new google.auth.GoogleAuth({
  keyFile: "./router/keys.json",
  scopes: scope,
});
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
    auth.getClient().then((a) => {
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
    });
    res.status(201).json({ success: true, message: "found" });
  } catch {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
