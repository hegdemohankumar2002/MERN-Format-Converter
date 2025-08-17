// server/config/jwt.js
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

console.log("Centralized JWT_SECRET:", JWT_SECRET);

module.exports = { JWT_SECRET }; 