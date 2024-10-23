require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


async function register(req, res) {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (first_name === "") {
      return res.status(400).send("Please, provide first name");
    }

    if (last_name === "") {
      return res.status(400).send("Please, provide last name");
    }

    const existingEmail = await User.findOne({ email });

    if (email === "") {

      return res.status(400).send("Please, provide email");

    } else if (existingEmail) {

      return res.status(400).json("Email already exist. Enter a new email");

    }

    if (password === "") {
      return res.status(400).send("Please, provide a password");
    }

    const hashPassword = await bcrypt.hash(password, 10);


    const user = new User({
      first_name, 
      last_name, 
      email, 
      password: hashPassword
    });

    await user.save();
    return res.status(200).json({ user });

  } catch (error) {

    return res.status(500).json({
      message: "An error occurred",
      error: error.message
    })

  }
}


async function login(req, res) {
  const { email, password } = req.body;

  const body = req.body;

  try {
    if (email === "") {
      return res.status(400).json("email required!");
    }

    if (password === "") {
      return res.status(400).json("password required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json("invalid password");
    }

    const token = jwt.sign(body, secretOrPrivateKey = process.env.SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
    
    return res.status(200).json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    res.status(500);
    return res.json({
      message: "an error occurred",
      error: error.message
    })
  }
}

module.exports = {
  register,
  login
}