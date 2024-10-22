require("dotenv").config();

const express = require("express");

const { connectToMongodb } = require("./connect_db");

const urlRoute = require("./routes/urlRoute");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/url", urlRoute);

//connecting to database
connectToMongodb();

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome home");
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})