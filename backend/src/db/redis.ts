import { Redis } from "ioredis";
import { env } from "../config/env.js";

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableReadyCheck: false
});

redis.on("error", () => {
  // Redis is an optimization layer. API routes keep working with in-memory fallbacks during local setup.
});
