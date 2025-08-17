const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Helper to get client IP (matches logic in convertRoutes.js)
function getClientIP(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

// Handle OPTIONS requests for CORS preflight
router.options("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

router.get("/", async (req, res) => {
  try {
    // Check if user is authenticated
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log("Token found, verifying...");
      
      try {
        // Verify token and get user info
        const jwt = require('jsonwebtoken');
        const { JWT_SECRET } = require("../config/jwt");
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token verified, user authenticated");
        
        // User is authenticated - return unlimited quota
        return res.json({
          type: "user",
          remaining: -1, // -1 indicates unlimited
          unlimited: true
        });
      } catch (tokenErr) {
        // Invalid token, continue as guest
        console.log("Invalid token, treating as guest:", tokenErr.message);
      }
    } else {
      console.log("No auth header found, treating as guest");
    }

    // Guest quota info
    const ip = getClientIP(req);
    let visitor = await Visitor.findOne({ ip });

    // Reset quota if lastReset is over 24h ago
    let count = visitor?.count || 0;
    if (visitor && visitor.lastReset) {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - visitor.lastReset > oneDay) {
        count = 0;
      }
    }

    const remaining = 10 - count;

    return res.json({
      type: "guest",
      remaining: remaining < 0 ? 0 : remaining,
    });
  } catch (err) {
    console.error("❌ Quota check error:", err.message);
    res.status(500).json({ message: "Server error while checking quota" });
  }
});

module.exports = router;
