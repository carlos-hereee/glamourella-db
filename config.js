const path = require("path");

module.exports = {
  contactFailed: "could not send email",
  calendarId: process.env.CALENDAR_ID,
  apiKey: process.env.CALENDAR_API_AKEY,
  accessToken: process.env.CALENDAR_ACCESS_TOKEN,
  clientUrl: process.env.CLIENT_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientEmail: process.env.CLIENT_EMAIL,
  project: process.env.PROJECT_NUMBER,
  projectId: process.env.PROJECT_ID,
  keyFile: path.join(__dirname, "keys.json"),
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
};
