const router = require("express").Router();
const fs = require("fs");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const {
  calendarId,
  clientEmail,
  apiKey,
  project,
  scopes,
  tokenPath,
  keyfilePath,
  contactFailed,
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
  const content = fs.readFileSync(tokenPath, (err, _) => {
    if (err) return null;
  });
  if (content.toString()) {
    const cred = JSON.parse(content);
    return google.auth.fromJSON(cred);
  }
};
const saveCredentials = async (client) => {
  return fs.readFile(keyfilePath, (err, data) => {
    if (err) return;
    const { web } = JSON.parse(data);
    console.log("client", client);
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: web.client_id,
      client_secret: web.client_secret,
      refresh_token: client.credentials.access_token,
      redirect_uris: web.redirect_uris,
    });

    fs.writeFile(tokenPath, payload, () => {});
  });
};
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  client = await authenticate({ scopes, keyfilePath });
  if (client.credentials) await saveCredentials(client);
  return client;
};
const listEvents = async (auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
  });
  return res.data.items;
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
    await authorize();
    // console.log("client", client);
    // .then(listEvents)
    // .catch((e) => console.log("eeror", e));
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
    console.log("this e", e);
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
