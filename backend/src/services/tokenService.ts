import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";
import type { AuthUser } from "../types/domain.js";

export function signAccessToken(user: AuthUser) {
  return jwt.sign(user, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(user: AuthUser, familyId = crypto.randomUUID()) {
  return jwt.sign({ ...user, familyId }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    maxAge
  };
}
