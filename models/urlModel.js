const mongoose = require("mongoose");
const User = require("./userModel");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  longUrl: {
    type: String,
    required: true
  },

  shortUrl: {
    type: String,
    required: true,
    unique: true
  },

  customAlias: {
    type: String,
    unique: true,
    sparse: true
  },

  clicks: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}) 

module.exports = mongoose.model("Url", urlSchema);