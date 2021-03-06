import { Request, Response } from "express";
import { db } from "./database";

export function userInfo(req: Request, res: Response) {
  const userInfo = req["auth"];
  console.log("Checking if user exists", userInfo);

  let user = db.findUserByEmail(userInfo.email);

  if (!user) {
    db.createUser(userInfo.email, userInfo.sub);
  }

  res.status(200).json({ email: userInfo.email });
}
