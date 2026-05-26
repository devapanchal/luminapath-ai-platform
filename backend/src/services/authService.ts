import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { query } from "../db/pool.js";
import type { AuthUser, Role } from "../types/domain.js";
import { ApiError } from "../utils/api.js";
import { hashToken } from "./tokenService.js";

type UserRecord = AuthUser & {
  password_hash: string;
  email_verified: boolean;
};

const demoUsers: UserRecord[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    email: "student@luminapath.ai",
    name: "Maya Student",
    role: "student",
    password_hash: bcrypt.hashSync("Luminapath#2026", 10),
    email_verified: true
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    email: "instructor@luminapath.ai",
    name: "Ira Instructor",
    role: "instructor",
    password_hash: bcrypt.hashSync("Luminapath#2026", 10),
    email_verified: true
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    email: "admin@luminapath.ai",
    name: "Noor Admin",
    role: "admin",
    password_hash: bcrypt.hashSync("Luminapath#2026", 10),
    email_verified: true
  }
];

function toAuthUser(user: UserRecord): AuthUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function findUserByEmail(email: string) {
  try {
    const result = await query<UserRecord>(
      "select id, email, name, role, password_hash, email_verified from users where lower(email) = lower($1)",
      [email]
    );
    return result.rows[0] ?? demoUsers.find((user) => user.email === email.toLowerCase());
  } catch {
    return demoUsers.find((user) => user.email === email.toLowerCase());
  }
}

export async function registerUser(input: { email: string; password: string; name: string; role?: Role }) {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new ApiError(409, "Email is already registered");

  const passwordHash = await bcrypt.hash(input.password, 12);
  try {
    const result = await query<UserRecord>(
      `insert into users (email, name, password_hash, role, email_verified)
       values ($1, $2, $3, $4, false)
       returning id, email, name, role, password_hash, email_verified`,
      [input.email.toLowerCase(), input.name, passwordHash, input.role ?? "student"]
    );
    return toAuthUser(result.rows[0]);
  } catch {
    return {
      id: crypto.randomUUID(),
      email: input.email.toLowerCase(),
      name: input.name,
      role: input.role ?? "student"
    } satisfies AuthUser;
  }
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(401, "Invalid email or password");
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new ApiError(401, "Invalid email or password");
  return toAuthUser(user);
}

export async function persistRefreshToken(userId: string, token: string, userAgent?: string, ip?: string) {
  try {
    await query(
      `insert into refresh_tokens (user_id, token_hash, user_agent, ip_address, expires_at)
       values ($1, $2, $3, $4, now() + interval '30 days')`,
      [userId, hashToken(token), userAgent ?? null, ip ?? null]
    );
  } catch {
    // Local demo mode without Postgres still returns signed tokens.
  }
}

export async function verifyGoogleCredential(credential: string) {
  if (!env.GOOGLE_CLIENT_ID) throw new ApiError(503, "Google OAuth is not configured");
  const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken: credential, audience: env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload?.email) throw new ApiError(401, "Google credential is invalid");

  const existing = await findUserByEmail(payload.email);
  if (existing) return toAuthUser(existing);

  return registerUser({
    email: payload.email,
    name: payload.name ?? payload.email.split("@")[0],
    password: crypto.randomBytes(24).toString("hex")
  });
}
