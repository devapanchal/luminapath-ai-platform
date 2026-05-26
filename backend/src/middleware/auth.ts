import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser, Role } from "../types/domain.js";
import { ApiError } from "../utils/api.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : req.cookies?.accessToken;
  if (!token) return next(new ApiError(401, "Authentication required"));

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    return next();
  } catch {
    return next(new ApiError(401, "Access token is invalid or expired"));
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Authentication required"));
    if (!roles.includes(req.user.role)) return next(new ApiError(403, "Insufficient role permissions"));
    return next();
  };
}
