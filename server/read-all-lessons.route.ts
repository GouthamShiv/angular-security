import { db } from "./database";
import { sessionStore } from "./session-store";
import { Request, Response } from "express";

export function readAllLessons(req: Request, res: Response) {
  const sessionId = req.cookies["SESSIONID"];

  const isSessionValid = sessionStore.isSessionValid(sessionId);

<<<<<<< HEAD
export function readAllLessons(req, res) {

    console.log("User is reading lessons data", req.user);

    res.status(200).json({lessons:db.readAllLessons()});

}
=======
  if (!isSessionValid) {
    res.sendStatus(403);
  } else {
    return res.status(200).json({ lessons: db.readAllLessons() });
  }
}
>>>>>>> 01-signup
