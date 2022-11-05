const path = require("path");
const process = require("process");

module.exports = {
  contactFailed: "could not send email",
  bookMessage: "Appoinment added successfully to your google calendar",
  calendarId: process.env.CALENDAR_ID,
  clientUrl: process.env.CLIENT_URL,
  clientId: process.env.CLIENT_ID,
  keyfilePath: path.join(process.cwd(), "google-credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
};
