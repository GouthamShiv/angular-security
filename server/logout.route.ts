import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function logout(req: Request, res: Response) {
  const sessionId = req.cookies["SESSIONID"];

  sessionStore.clearSession(sessionId);

  res.clearCookie("SESSIONID");
  res.status(200).send();
}
