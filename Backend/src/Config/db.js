import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export async function initDB() {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS lost_found (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      status TEXT CHECK(status IN ('lost', 'found')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS photo_contest (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      photo_url TEXT,
      description TEXT,
      votes INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      image_url TEXT
    );
  `);

  console.log("✅ Database initialized");
}

export default {
  run: (...args) => db.run(...args),
  all: (...args) => db.all(...args),
  get: (...args) => db.get(...args),
};
