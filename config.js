const path = require("path");
const process = require("process");

module.exports = {
  errMail: "could not send email",
  successMail: "could not send email",
  bookingNotFound:
    "This appointment was not found in calendar, pick a different appointment",
  bookMessage: "Appoinment was created successfully!",
  galleryEmpty: "Url path is empty and is required",
  notFound: "Not found",
  notFoundUser: "Couldn't find user with that uid",
  errMakeUser: "Couldn't create your account this moment, try again later",
  errCredentrial: "username or password are invalid",
  successfulLogout: "Bye, come back soon",
  errLogout: "Unable to log out",
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
