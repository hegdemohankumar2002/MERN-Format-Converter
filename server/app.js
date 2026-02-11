// server/app.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const convertRoutes = require("./routes/convertRoutes");
const quotaRoutes = require("./routes/quota");
const contactRoutes = require("./routes/contact");
// const pdfWordRoutes = require("./routes/pdfWordRoutes"); // Removed PDF/Word routes
const path = require("path");

dotenv.config();
// Read allowed origins from environment (comma-separated)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Set default environment variables if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "your_jwt_secret_key_here";
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow explicit allowlist from env
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost and local network IPs
    if (
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://192.168.') ||
      origin.startsWith('http://10.') ||
      origin.startsWith('http://172.')
    ) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authMiddleware = require("./middleware/auth");

// Health check
app.get('/', (_req, res) => {
  res.status(200).send('OK');
});

// Connect MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mern_converter";
mongoose
  .connect(mongoUri)
  .then(() => console.log("[SUCCESS] MongoDB connected"))
  .catch((err) => {
          console.error("[ERROR] MongoDB error:", err);
      console.log("[WARNING] Server will continue without database connection");
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/convert", convertRoutes);
app.use("/api/quota", quotaRoutes);
app.use("/api/contact", contactRoutes);
// app.use("/api/pdfword", pdfWordRoutes); // Removed PDF/Word routes

// Serve uploaded files
app.use("/downloads", express.static(path.join(__dirname, "downloads")));
// Serve outputs directory for converted zips
app.use("/outputs", express.static(path.join(__dirname, "outputs")));
// Serve converted files for download (YouTube, etc.)
app.use("/download", express.static(path.join(__dirname, "converted")));

// Serve client build (after API and file routes)
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// SPA fallback: send index.html for non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
