import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export async function initDB() {
  db = await open({
    filename: process.env.DB_PATH || "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT
    );
  `);

  console.log("✅ Database initialized");
  return db;
}

// ✅ export db as default so models can import it
export default {
  run: (...args) => db.run(...args),
  all: (...args) => db.all(...args),
  get: (...args) => db.get(...args),
};
