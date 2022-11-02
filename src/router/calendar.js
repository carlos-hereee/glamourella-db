const router = require("express").Router();
const fs = require("fs");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const {
  calendarId,
  clientEmail,
  apiKey,
  project,
  keyFile,
  scopes,
  clientId,
  clientSecret,
  tokenPath,
  credentialsPath,
  contactFailed,
  redirectUri,
  credentials,
} = require("../../config");

// const keys = JSON.parse(fs.readFileSync(keyFile));
// const jwtClient = new google.auth.JWT(clientEmail, null, apiKey, scopes);
// const oauthClient = new google.auth.OAuth2(
//   clientId,
//   clientSecret
//   // redirect_uris[0]
// );
// const calendar = google.calendar({ version: "v3", project, auth: oauthClient });
// const auth = new google.auth.GoogleAuth({ keyFile, scopes, keys });
const loadSavedCredentialsIfExist = async () => {
  try {
    const content = await fs.readFile(tokenPath);
    const credentials = JSON.parse(content);
    console.log("credentials", credentials);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log(`An err occured ${err}`);
    return null;
  }
};
const saveCredentials = async (client) => {
  // const content = await fs.readFile(credentialsPath);
  console.log("credentials", credentials);
  const keys = JSON.parse(credentials);
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: keys.client_id,
    client_secret: keys.clientSecret,
    refresh_token: client.credentials.refresh_token,
    redirect_uris: keys.redirect_uris,
  });
  await fs.writeFile(tokenPath, payload);
};
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  client = await authenticate({ scopes, keyfilePath: credentialsPath });
  if (client.credentials) await saveCredentials(client);
  return client;
};

const listEvents = async (auth) => {
  console.log("auth", auth);
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
};

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
    console.log("credentials", credentials);
    const a = await authorize().then(listEvents).catch(console.error);
    // const a = await auth.getClient();

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
    // calendar.events.list({ calendarId }, (err, result) => {
    //   if (err) {
    //     console.log("something wrong ", err);
    //   } else {
    //     if (result.data.items.length > 0) {
    //       console.log("list", result.data.items);
    //     } else {
    //       console.log("no upcoming event ");
    //     }
    //   }
    // });
    res.status(201).json({ success: true, message: "found" });
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
