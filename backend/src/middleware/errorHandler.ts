import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/api.js";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(422).json({ success: false, message: "Validation failed", issues: error.flatten() });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ success: false, message: error.message, details: error.details });
  }

  logger.error({ error, path: req.originalUrl }, "Unhandled API error");
  return res.status(500).json({ success: false, message: "Unexpected server error" });
}
