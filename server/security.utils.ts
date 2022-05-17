import moment = require("moment");
const util = require("util");
const crypto = require("crypto");
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

export const randomBytes = util.promisify(crypto.randomBytes);

export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync("./demos/private.key");

const RSA_PUBLIC_KEY = fs.readFileSync("./demos/public.key");

const SESSION_DURATION = 1000;

export async function createSessionToken(userId: string) {
  return signJwt({}, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: SESSION_DURATION,
    subject: userId,
  });
}

export async function decodeJwt(token: string) {
  const payload = jwt.verify(token, RSA_PUBLIC_KEY);
  console.log(payload);
  return payload;
}

export async function createCSRFToken(sessionToken: string) {
  return argon2.hash(sessionToken);
}
