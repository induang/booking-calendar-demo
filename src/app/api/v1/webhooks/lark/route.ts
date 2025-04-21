import crypto from "crypto";

const encryptKey = process.env.LARK_ENCRYPT_KEY;
export async function POST(req: Request) {
  const body = await req.text(); // 这个很重要
  const signature = await calculateSignature(req, body);
  const headerSignature = req.headers.get("X-Lark-Signature");
  if (signature !== headerSignature) {
    return Response.json({
      status: 400,
      message: "Invalid signature",
    });
  }

  if (!encryptKey) {
    throw new Error("Missing required encryptKey.");
  }
  const aesCipher = new AESCipher(encryptKey);
  const decryptBody = aesCipher.decrypt(JSON.parse(body)?.encrypt);
  console.log("decryptBody", decryptBody);

  return Response.json({
    status: 200,
    message: "Webhook received",
  });
}

async function calculateSignature(req: Request, body: string) {
  const timestamp = req.headers.get("X-Lark-Request-Timestamp");
  const nonce = req.headers.get("X-Lark-Request-Nonce");
  if (!timestamp || !nonce) {
    throw new Error("Missing required headers.");
  }
  if (!encryptKey) {
    throw new Error("Missing required encryptKey.");
  }

  const content = timestamp + nonce + encryptKey + body;
  const sign = crypto.createHash("sha256").update(content).digest("hex");
  return sign;
}

class AESCipher {
  private key: Buffer;
  constructor(key: string) {
    const hash = crypto.createHash("sha256");
    hash.update(key);
    this.key = hash.digest();
  }
  decrypt(encrypt: string) {
    const encryptBuffer = Buffer.from(encrypt, "base64");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      this.key,
      encryptBuffer.slice(0, 16)
    );
    let decrypted = decipher.update(
      encryptBuffer.slice(16).toString("hex"),
      "hex",
      "utf8"
    );
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
