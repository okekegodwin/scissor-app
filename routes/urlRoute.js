const express = require("express");

const router = express.Router();

const controller = require("../controllers/urlController");


// routing methods
router.post("/", controller.shortenUrl);
router.get("/:code", controller.redirectUrl);
router.post("/generate-qrcode", controller.generateQrCode);
router.get("/", controller.getAllUrls);
router.put("/:id", controller.updateAlias);
router.delete("/:id", controller.deleteUrl);

module.exports = router