const express = require("express");

const router = express.Router();

const controller = require("../controllers/urlController");
const { verifyToken } = require("../middleware/authMiddleware");


// routing methods
router.post("/", verifyToken, controller.shortenUrl);
router.get("/redirect/:code", verifyToken, controller.redirectUrl);
router.post("/generate-qrcode", verifyToken, controller.generateQrCode);
router.get("/", controller.getAllUrls);
router.put("/:id", verifyToken, controller.updateAlias);
router.delete("/:id", verifyToken, controller.deleteUrl);

module.exports = router