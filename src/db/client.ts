import path from "node:path";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "@/db/schema";

function resolveSqlitePath() {
  const raw = process.env.DATABASE_URL ?? "file:./data/testy.sqlite";
  const cleaned = raw.replace(/^file:/, "");
  return path.isAbsolute(cleaned) ? cleaned : path.resolve(process.cwd(), cleaned);
}

const sqlite = new Database(resolveSqlitePath());
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
export { sqlite };
