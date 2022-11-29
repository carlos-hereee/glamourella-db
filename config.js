const path = require("path");
const process = require("process");

module.exports = {
  successMail: "could not send email",
  bookingNotFound:
    "This appointment was not found in calendar, pick a different appointment",
  bookMessage: "Appoinment was created successfully!",
  galleryEmpty: "Url path is empty and is required",
  notFound: "Not found",
  userNotFound: "** User not found **",
  errAlreadyExists: "** A user already exists with that email **",
  notFoundUser: "Couldn't find user with that uid",
  successfulLogout: "Bye, come back soon",
  errServer: "Server is down come back in a bit!",
  errMakeUser: "Couldn't create your account this moment, try again later",
  errCredentrial: "username or password are invalid",
  errMail: "could not send email",
  errLogout: "Unable to log out",
  errCalId: "missing calendar id in header",
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  isDev: process.env.NODE_ENV === "development",
  dbUrl: process.env.DB_URL,
  cookieName: process.env.COOKIE_NAME,
  accessSecret: process.env.ACCESS_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  clientUrl: process.env.CLIENT_URL,
  clientId: process.env.CLIENT_ID,
  keyfilePath: path.join(process.cwd(), "google-credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  assetsPath: path.join(process.cwd(), "assets"),
  filePath: (name) => path.join(process.cwd(), `${name}`),
};
