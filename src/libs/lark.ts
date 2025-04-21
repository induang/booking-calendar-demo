import * as lark from "@larksuiteoapi/node-sdk";

const appId = process.env.LARK_APP_ID;
const appSecret = process.env.LARK_APP_SECRET;

if (!appId || !appSecret) {
  throw new Error("LARK_APP_ID and LARK_APP_SECRET must be set.");
}

const larkClient = new lark.Client({
  appId,
  appSecret,
  disableTokenCache: false,
});
export default larkClient;
