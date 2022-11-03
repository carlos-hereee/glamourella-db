const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const fs = require("fs");
const { scopes, tokenPath, keyfilePath } = require("../../config");

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

module.exports = { authorize };
