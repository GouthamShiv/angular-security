import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from "argon2";
import { validatePassword } from "./password-validator";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";

export function createUser(req: Request, res: Response) {
  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    createUserWithSession(res, credentials);
  }
}

async function createUserWithSession(res: Response, credentials) {
  const passwordDigest = await argon2.hash(credentials.password);
  const user = db.createUser(credentials.email, passwordDigest);
  const sessionId = await randomBytes(32)
    .then((bytes) => bytes.toString("hex"))
    .catch((err) => console.log(err));

  sessionStore.createSession(sessionId, user);

  console.log(USERS);
  console.log(sessionId);

  res.cookie("SESSIONID", sessionId, {
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  res.status(200).json({ id: user.id, email: user.email });
}
