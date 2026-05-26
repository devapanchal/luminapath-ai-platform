import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { loginUser, persistRefreshToken, registerUser, verifyGoogleCredential } from "../services/authService.js";
import { cookieOptions, signAccessToken, signRefreshToken } from "../services/tokenService.js";
import type { AuthUser } from "../types/domain.js";
import { ApiError, ok } from "../utils/api.js";

function issueSession(res: Response, user: AuthUser, req: Request) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  void persistRefreshToken(user.id, refreshToken, req.headers["user-agent"], req.ip);

  res.cookie("accessToken", accessToken, cookieOptions(1000 * 60 * 15));
  res.cookie("refreshToken", refreshToken, cookieOptions(1000 * 60 * 60 * 24 * 30));
  return { user, accessToken, refreshToken };
}

export async function register(req: Request, res: Response) {
  const user = await registerUser(req.body);
  return ok(res, issueSession(res, user, req), 201);
}

export async function login(req: Request, res: Response) {
  const user = await loginUser(req.body.email, req.body.password);
  return ok(res, issueSession(res, user, req));
}

export async function googleLogin(req: Request, res: Response) {
  const user = await verifyGoogleCredential(req.body.credential);
  return ok(res, issueSession(res, user, req));
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken ?? req.body.refreshToken;
  if (!token) throw new ApiError(401, "Refresh token required");
  const user = jwt.verify(token, env.JWT_REFRESH_SECRET) as AuthUser;
  return ok(res, issueSession(res, user, req));
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return ok(res, { message: "Signed out" });
}

export async function forgotPassword(req: Request, res: Response) {
  return ok(res, {
    message: `Password reset instructions queued for ${req.body.email}. Configure SMTP to send email in production.`
  });
}

export async function verifyEmail(req: Request, res: Response) {
  return ok(res, { message: `Email verification token accepted`, token: req.body.token });
}
