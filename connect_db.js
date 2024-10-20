require("dotenv").config();

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI

function connectToMongodb() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfull");
  })

  mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB");
  })
}

module.exports = { connectToMongodb }