import type { NextFunction, Request, Response } from "express";
import xss from "xss";

function scrub(value: unknown): unknown {
  if (typeof value === "string") return xss(value.trim());
  if (Array.isArray(value)) return value.map(scrub);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, scrub(inner)]));
  }
  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  req.body = scrub(req.body);
  next();
}
