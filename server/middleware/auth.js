const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization") || "";
  let token = null;

  // Accept both "Bearer <token>" and just "<token>"
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (authHeader) {
    token = authHeader;
  }

  if (token) {
    console.log("[AUTH] Token received:", token.substring(0, 12) + "... (truncated)");
  } else {
    console.log("[AUTH] No token received");
  }

  if (!token) {
    req.user = null; // Unauthenticated but still allowed
    req.userId = null; // Unauthenticated but still allowed
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
      req.userId = null;
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.log("[AUTH] Token valid, user:", decoded);
    req.user = decoded; // contains user id or payload
    req.userId = decoded.id || decoded.userId || decoded._id; // Set userId for routes
    next();
  });
};
