import { Request, Response, NextFunction } from "express";

export function isUerAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req["userId"]) {
    next();
  } else {
    res.sendStatus(403);
  }
}
