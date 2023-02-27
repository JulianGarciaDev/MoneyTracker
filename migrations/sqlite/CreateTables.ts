require("dotenv").config();

const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const dbFile = process.env.DB_PATH;
const sqlFile = "./migrations/sqlite/0000_create_tables.sql";

function createDbConnection() {
  const db = new sqlite3.Database(dbFile, (error) => {
    if (error) {
      console.log("Error creating database:");
      return console.error(error.message);
    }
    createTable(db);
  });
  return db;
}

function createTable(db) {
  console.log("Creating tables...");
  fs.readFile(sqlFile, "utf8", (err, data) => {
    if (err) {
      console.log("Error creating tables:");
      console.error(err);
      return;
    }
    db.exec(data);
  });
}

module.exports = createDbConnection();
