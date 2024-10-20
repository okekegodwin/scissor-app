const express = require("express");

const router = express.Router();

const controller = require("../controllers/urlController");


// routing methods
router.post("/", controller.shortenUrl);
router.get("/:code", controller.redirectUrl);
router.post("/generate-qrcode", controller.generateQrCode);
router.get("/", controller.getAllUrls);

module.exports = router