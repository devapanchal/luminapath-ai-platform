import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(dirname, "../../../database/seed.sql");
await pool.query(await fs.readFile(seedPath, "utf8"));
console.log("Seed data inserted");
await pool.end();
