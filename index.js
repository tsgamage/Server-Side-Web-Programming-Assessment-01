import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
env.config();

try {
  const db = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
} catch (error) {
  console.error("Error while connecting to the Database: ", error);
}

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Princess");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
