import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().default("postgres://luminapath:luminapath@localhost:5432/luminapath"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  JWT_ACCESS_SECRET: z.string().min(12).default("dev-access-secret-change-me"),
  JWT_REFRESH_SECRET: z.string().min(12).default("dev-refresh-secret-change-me"),
  CSRF_SECRET: z.string().min(12).default("dev-csrf-secret-change-me"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  OPENAI_API_KEY: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional()
});

export const env = schema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";
