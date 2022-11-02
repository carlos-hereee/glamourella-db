const path = require("path");
const process = require("process");

module.exports = {
  contactFailed: "could not send email",
  calendarId: process.env.CALENDAR_ID,
  apiKey: process.env.CALENDAR_API_AKEY,
  accessToken: process.env.CALENDAR_ACCESS_TOKEN,
  clientUrl: process.env.CLIENT_URL,
  clientEmail: process.env.CLIENT_EMAIL,
  project: process.env.PROJECT_NUMBER,
  keyfilePath: path.join(process.cwd(), "credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
};
