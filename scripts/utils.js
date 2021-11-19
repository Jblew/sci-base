const Axios = require("axios");
const fs = require("fs");

const ZOTERO_APIKEY = process.env.ZOTERO_APIKEY;
if (!ZOTERO_APIKEY) throw new Error("Missing env ZOTERO_APIKEY");
const ZOTERO_USERID = process.env.ZOTERO_USERID;
if (!ZOTERO_USERID) throw new Error("Missing env ZOTERO_USERID");

async function getFromZotero(apiUrl, params) {
  const key = ZOTERO_APIKEY;
  const userid = ZOTERO_USERID;
  const url = `https://api.zotero.org/users/${userid}/${apiUrl}`;
  const resp = await Axios({
    method: "get",
    url,
    params: {
      ...params,
      v: "3",
      key,
    },
  });
  console.log("Response from zotero", resp);
  if (!resp.status === 200) {
    throw new Error(`Response status is ${resp.status}`);
  }
  return resp.data;
}

async function writeToFile(path, data) {
  return fs.writeFileSync(path, data);
}

module.exports = { getFromZotero, writeToFile };
