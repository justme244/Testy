import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

function resolveSqlitePath() {
  const raw = process.env.DATABASE_URL ?? "file:./data/testy.sqlite";
  const cleaned = raw.replace(/^file:/, "");
  return path.isAbsolute(cleaned) ? cleaned : path.resolve(process.cwd(), cleaned);
}

function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function run() {
  const dbPath = resolveSqlitePath();
  ensureDir(dbPath);

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS __migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      run_at TEXT NOT NULL
    )
  `);

  const migrationDir = path.resolve(process.cwd(), "migrations");
  const files = fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  const hasMigration = sqlite.prepare("SELECT 1 FROM __migrations WHERE name = ? LIMIT 1");
  const insertMigration = sqlite.prepare("INSERT INTO __migrations (name, run_at) VALUES (?, ?)");

  for (const file of files) {
    const applied = hasMigration.get(file);
    if (applied) continue;

    const sql = fs.readFileSync(path.join(migrationDir, file), "utf-8");
    sqlite.exec("BEGIN");
    try {
      sqlite.exec(sql);
      insertMigration.run(file, new Date().toISOString());
      sqlite.exec("COMMIT");
      console.log(`Applied migration: ${file}`);
    } catch (error) {
      sqlite.exec("ROLLBACK");
      throw error;
    }
  }

  sqlite.close();
}

run();
