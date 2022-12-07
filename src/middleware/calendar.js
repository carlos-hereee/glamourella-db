const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const fs = require("fs");
const { scopes, tokenPath, keyfilePath } = require("../../config");
// const { GoogleAuth } = require("google-auth-library");
const Calendar = require("../models/calendar");
const Event = require("../models/events");

const loadSavedCredentialsIfExist = async () => {
  if (fs.existsSync(tokenPath)) {
    const content = fs.readFileSync(tokenPath, (err, _) => {
      if (err) return null;
    });
    if (content.toString()) {
      const cred = JSON.parse(content);
      if (cred?.expiry_date < new Date().getTime()) {
        return null;
      }
      return google.auth.fromJSON(cred);
    }
  } else {
    return null;
  }
};
const saveCredentials = async (client) => {
  return fs.readFile(keyfilePath, (err, data) => {
    if (err) return;
    const { web } = JSON.parse(data);
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: web.client_id,
      client_secret: web.client_secret,
      refresh_token: client.credentials.access_token,
      redirect_uris: web.redirect_uris,
      expiry_date: client.credentials.expiry_date,
    });
    fs.writeFile(tokenPath, payload, () => {});
  });
};
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  client = await authenticate({ scopes, keyfilePath });
  // console.log("client", client);
  if (client.credentials) await saveCredentials(client);
  return client;
  // const auth = new GoogleAuth({
  //   scopes,
  //   keyFilename: "google-credentials.json",
  // });
  // const client = await auth.getClient();
  // console.log("client", client);
  // const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  // const res = await client.request({ url });
  // console.log("res", res);
  // console.log("client, projectId", client, );
};
const createNewCalendar = async (data) => {
  const calendar = await new Calendar(data).save();
  if (calendar.length) {
    return calendar;
  }
};
const findCalendarEvents = async (req, res, next) => {
  const calendarId = req.headers.calendarid;
  !calendarId && res.status(400).json({ success: false, message: errCalId });
  const events = await Event.find({ calendarId });
  req.events = events;
  next();
};

module.exports = { authorize, findCalendarEvents, createNewCalendar };
