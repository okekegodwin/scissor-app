require("dotenv").config();

const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json("Access denied. No token provided");
  }

  try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY, true);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(400).json({ message: 'Invalid token.' });

  }
}

module.exports = {
  verifyToken
}