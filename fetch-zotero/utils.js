const Axios = require("axios");

const ZOTERO_APIKEY = process.env.ZOTERO_APIKEY;
if (!ZOTERO_APIKEY) throw new Error("Missing env ZOTERO_APIKEY");
const ZOTERO_USERID = process.env.ZOTERO_USERID;
if (!ZOTERO_USERID) throw new Error("Missing env ZOTERO_USERID");

const encodeGetParams = (p) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");

async function getFromZotero(apiUrl, params) {
  const apikey = ZOTERO_APIKEY;
  const userid = ZOTERO_USERID;
  const getParams = encodeGetParams(params);
  const url = `https://api.zotero.org/users/${userid}/${apiUrl}`;
  const resp = await Axios({
    method: "get",
    url,
    params: {
      ...params,
      v: "3",
      key: ZOTERO_APIKEY,
    },
  });
  if (!resp.status === 200) {
    throw new Error(`Response status is ${resp.status}`);
  }
  return resp.data;
}

module.exports = { encodeGetParams, getFromZotero };
