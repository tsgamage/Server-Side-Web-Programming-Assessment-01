import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
env.config();

const PORT = 3000;

const db = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Princess");
});

app.post("/customers/register", async(req, res) => {
  const {
    name,
    address,
    email,
    dateOfBirth,
    gender,
    age,
    cardHolderName,
    cardNumber,
    expireDate,
    cvv,
  } = req.body;

let insertResult

  try {

    insertResult = await db.query(
        "INSERT INTO customerRegister (name, address, email, dob, gender, age, cardholdername, cardnumber, expiredate , cvv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, name",
        [
          name,
          address,
          email,
          dateOfBirth,
          gender,
          age,
          cardHolderName,
          cardNumber,
          expireDate,
          cvv,
        ]
      );
      
    console.log("Inserted customer data: ", insertResult.rows[0]);
    res.status(201);
    res.send({
      message: `Customer ${insertResult.rows[0].name} registered successfully`,
      customertId: insertResult.rows[0].id,
    });
} catch (error) {
    console.log("Error while inserting data: ", error);
    res.status(400);
    res.send("Bad Request");
}
// console.log(
    //   "Received customer registration request:",
    //   "Name:",
    //   name,
    //   "Address:",
    //   address,
    //   "Email:",
    //   email,
    //   "Date of Birth:",
    //   dateOfBirth,
    //   "Gender:",
    //   gender,
    //   "Age:",
    //   age,
    //   "Card Holder Name:",
    //   cardHolderName,
    //   "Card Number:",
    //   cardNumber,
    //   "Expire Date:",
    //   expireDate,
    //   "CVV:",
    //   cvv
    // );
});

app.get("/customers", async(req, res) => {
    const constomerData = await db.query("SELECT * FROM customerRegister");
    res.send(constomerData.rows);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});