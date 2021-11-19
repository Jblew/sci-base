const Axios = require("axios");
const parseLinkHeader = require("parse-link-header");
const fs = require("fs");

const ZOTERO_APIKEY = process.env.ZOTERO_APIKEY;
if (!ZOTERO_APIKEY) throw new Error("Missing env ZOTERO_APIKEY");
const ZOTERO_USERID = process.env.ZOTERO_USERID;
if (!ZOTERO_USERID) throw new Error("Missing env ZOTERO_USERID");

async function getItemsFromZotero(apiUrl) {
  const userid = ZOTERO_USERID;
  let url = `https://api.zotero.org/users/${userid}/${apiUrl}`;
  const items = [];

  while (url) {
    const resp = await getFromZoteroRaw(url);
    items.push(...resp.data);
    const nextUrl = getNextUrlFromZoteroResponseHeaders(resp.headers);
    if (nextUrl) url = nextUrl;
    else url = undefined;
  }
  return items;
}

async function getFromZoteroRaw(url) {
  const key = ZOTERO_APIKEY;
  const resp = await Axios({
    method: "get",
    url,
    headers: {
      "Zotero-API-Version": 3,
      "Zotero-API-Key": key,
    },
  });
  if (!resp.status === 200) {
    throw new Error(`Response status is ${resp.status}`);
  }
  return resp;
}

function getNextUrlFromZoteroResponseHeaders(headers) {
  const linkHeader = headers["Link"];
  if (!linkHeader) return;
  const parsed = parseLinkHeader(linkHeader);
  if (parsed.next) {
    return parsed.next.url;
  }
}

async function writeToFile(path, data) {
  return fs.writeFileSync(path, data.toString());
}

module.exports = { getItemsFromZotero, writeToFile };
