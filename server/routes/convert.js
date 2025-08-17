const express = require("express");
const router = express.Router();
const { convertImages } = require("../controllers/converter");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, convertImages);

module.exports = router;
