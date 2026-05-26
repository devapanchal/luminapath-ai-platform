import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { env, isProduction } from "../config/env.js";
import { ApiError } from "../utils/api.js";

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies?.csrfToken as string | undefined;
  if (!token) {
    token = crypto.createHmac("sha256", env.CSRF_SECRET).update(crypto.randomUUID()).digest("hex");
    res.cookie("csrfToken", token, {
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 12
    });
  }

  if (safeMethods.has(req.method) || req.path.startsWith("/api/auth/")) {
    return next();
  }

  if (req.headers["x-csrf-token"] !== token) {
    return next(new ApiError(403, "Invalid CSRF token"));
  }

  return next();
}
