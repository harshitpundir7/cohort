import { Client } from "pg";
import express from "express";
const app = express();
app.use(express.json());

const pgClient = new Client(
  "ppostgresql://learningSQL_owner:npg_WXYetG9d1UNj@ep-shiny-darkness-a8q16t84-pooler.eastus2.azure.neon.tech/learningSQL?sslmode=require"
);
pgClient.connect();

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const q = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`;
    console.log(q);
    const response = await pgClient.query(q);
    console.log(response.rows);
    res.json({
      message: "Signup SUccesfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
