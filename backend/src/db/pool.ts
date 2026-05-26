import pg, { type QueryResultRow } from "pg";
import { env } from "../config/env.js";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

export async function query<T extends QueryResultRow = Record<string, unknown>>(text: string, params: unknown[] = []) {
  return pool.query<T>(text, params);
}
