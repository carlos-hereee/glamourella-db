const path = require("path");
const process = require("process");

module.exports = {
  contactFailed: "could not send email",
  bookingNotFound:
    "This appointment was not found in calendar, please pick a different appointment",
  bookMessage: "Appoinment was created successfully!",
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  cookieName: process.env.COOKIE_NAME,
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
