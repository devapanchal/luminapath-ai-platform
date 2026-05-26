import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { csrfProtection } from "./middleware/csrf.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { sanitizeInput } from "./middleware/sanitize.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import platformRoutes from "./routes/platformRoutes.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(pinoHttp({ logger }));
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true
    })
  );
  app.use(compression());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(hpp());
  app.use(sanitizeInput);
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
  app.use(csrfProtection);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "luminapath-api", timestamp: new Date().toISOString() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/platform", platformRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
