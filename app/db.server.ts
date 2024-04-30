import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database
});

await db.exec(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT, username TEXT)`);
