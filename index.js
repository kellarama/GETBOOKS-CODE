const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const app = express();

const server = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is Running at https://localHost:3000");
    });
  } catch (e) {
    console.log(`DB error:${e.message}`);
    process.exit(1);
  }
};
server();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book
    ORDER BY
    book_id
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
