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
  keyFile: path.join(process.cwd(), "credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  credentialsPath: path.join(process.cwd(), "credentials.json"),
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  credentials: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_id: process.env.PROJECT_ID,
    redirect_uris: `${process.env.DB_URL}/oauth2callback`,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  },
};
