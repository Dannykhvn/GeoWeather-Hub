const db = require('../config/db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);


  console.log('Tables created successfully.');
});