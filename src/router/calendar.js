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
router.get("/events", async (req, res) => {
  try {
    const client = await authorize();
    const calendar = google.calendar({ version: "v3", auth: client });
    await calendar.events.list({ calendarId, apiKey }, (err, result) => {
      if (err) return;
      res.status(200).json({ success: true, data: result.data });
    });
  } catch (e) {
    res.status(500).json({ success: false, message: contactFailed });
  }
});
router.post("/auth-link", (req, res) => {});

module.exports = router;
