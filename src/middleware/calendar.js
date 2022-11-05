const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const fs = require("fs");
const { scopes, tokenPath, keyfilePath } = require("../../config");

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
};

module.exports = { authorize };
