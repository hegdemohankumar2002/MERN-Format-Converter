// server/routes/convertRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const Visitor = require("../models/Visitor");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Ensure upload and output directories exist
const uploadDir = path.join(__dirname, "../uploads");
const outputDir = path.join(__dirname, "../outputs");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});
const upload = multer({ storage });

// Helper to get client IP
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
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

router.post("/", upload.array("images"), async (req, res) => {
  const ip = getClientIP(req);
  const timestamp = Date.now();
  const userId = req.userId || null;

  console.log(`[INFO] File upload request received`);
  console.log(`[INFO] Files count: ${req.files ? req.files.length : 0}`);
  console.log(`[INFO] User ID: ${userId}`);
  console.log(`[INFO] IP: ${ip}`);

  // Prepare temp input/output directories
  const tempBase = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempBase)) fs.mkdirSync(tempBase, { recursive: true });
  const inputDir = path.join(tempBase, `${timestamp}_in`);
  const outputDirLocal = path.join(tempBase, `${timestamp}_out`);
  fs.mkdirSync(inputDir, { recursive: true });
  fs.mkdirSync(outputDirLocal, { recursive: true });

  console.log(`[INFO] Created temp directories:`);
  console.log(`   Input: ${inputDir}`);
  console.log(`   Output: ${outputDirLocal}`);

  // Move uploaded files to inputDir
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      console.log(`📄 Processing file: ${file.originalname} (${file.mimetype})`);
      const destPath = path.join(inputDir, path.basename(file.path));
      fs.renameSync(file.path, destPath);
      console.log(`[SUCCESS] Moved file to: ${destPath}`);
    }
  } else {
    console.log(`[ERROR] No files received in request`);
    return res.status(400).json({ message: "No files uploaded." });
  }

  try {
      console.log(`[INFO] Starting conversion with Python script...`);
  console.log(`[INFO] Input directory: ${inputDir}`);
  console.log(`[INFO] Output directory: ${outputDirLocal}`);
    console.log(`🐍 Python script path: ${path.join(__dirname, "..", "converter", "convert_batch.py")}`);
    
    const pythonScriptPath = path.join(__dirname, "..", "converter", "convert_batch.py");
    console.log(`🐍 Executing Python script: ${pythonScriptPath}`);
    
    const convert = spawn("python", [
      pythonScriptPath,
      inputDir,
      outputDirLocal,
    ]);

    convert.stdout.on("data", (data) => console.log(`Python stdout: ${data}`));
    convert.stderr.on("data", (data) => console.error(`Python stderr: ${data}`));
    
    convert.on("error", (err) => {
      console.error(`[ERROR] Failed to start Python process: ${err}`);
      fs.rmSync(inputDir, { recursive: true, force: true });
      fs.rmSync(outputDirLocal, { recursive: true, force: true });
      return res.status(500).json({ message: "Failed to start conversion process." });
    });

    convert.on("close", async (code) => {
      console.log(`🐍 Python script exited with code: ${code}`);
      
      if (code !== 0) {
        console.log(`[ERROR] Python script failed with exit code: ${code}`);
        // Clean up temp dirs
        fs.rmSync(inputDir, { recursive: true, force: true });
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        return res.status(500).json({ message: "Conversion failed. Python script exited with error." });
      }

      // Check if we have a single file or multiple files
      const outputFiles = fs.readdirSync(outputDirLocal);
      if (outputFiles.length === 0) {
        fs.rmSync(inputDir, { recursive: true, force: true });
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        return res.status(500).json({ message: "No files converted." });
      }

      // Create zip for multiple files or backup
      const zipFilename = `${uuidv4()}.zip`;
      const zipPath = path.join(outputDir, zipFilename);
      const output = fs.createWriteStream(zipPath);
      const archiver = require("archiver");
      const archive = archiver("zip");

      archive.pipe(output);
      archive.directory(outputDirLocal, false);
      archive.finalize();

      // If single file, also create direct download
      let directDownloadData = null;
      if (outputFiles.length === 1) {
        const singleFile = outputFiles[0];
        const filePath = path.join(outputDirLocal, singleFile);
        const fileExt = path.extname(singleFile);
        const directFilename = `${uuidv4()}${fileExt}`;
        const directPath = path.join(outputDir, directFilename);
        
        fs.copyFileSync(filePath, directPath);
        directDownloadData = {
          directDownloadUrl: `/outputs/${directFilename}`,
          fileName: singleFile,
          fileType: fileExt
        };
      }

      output.on("close", async () => {
        // Quota and usage logic
        if (userId) {
          await User.findByIdAndUpdate(userId, { $inc: { convertedCount: 1 } });
        } else {
          let visitor = await Visitor.findOne({ ip });
          if (!visitor) visitor = new Visitor({ ip, count: 0, lastReset: new Date() });

          const now = new Date();
          const oneDay = 24 * 60 * 60 * 1000;
          if (now - visitor.lastReset > oneDay) {
            visitor.count = 0;
            visitor.lastReset = now;
          }

          if (visitor.count >= 10) {
            // Clean up temp dirs and files if quota exceeded
            fs.rmSync(inputDir, { recursive: true, force: true });
            fs.rmSync(outputDirLocal, { recursive: true, force: true });
            fs.rmSync(zipPath, { force: true });
            if (directDownloadData) {
              const directPath = path.join(outputDir, directDownloadData.directDownloadUrl.split('/').pop());
              if (fs.existsSync(directPath)) fs.rmSync(directPath, { force: true });
            }
            return res.status(403).json({ message: "Quota exceeded" });
          }

          visitor.count += 1;
          await visitor.save();
        }

        const responseData = { downloadUrl: `/outputs/${zipFilename}` };
        if (directDownloadData) {
          Object.assign(responseData, directDownloadData);
        }

        res.json(responseData);

        // Clean up temp dirs
        fs.rmSync(inputDir, { recursive: true, force: true });
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
      });

      archive.on("error", (err) => {
        fs.rmSync(inputDir, { recursive: true, force: true });
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });
        console.error("Archiver error:", err);
        res.status(500).json({ message: "Failed to create zip archive." });
      });
    });
  } catch (err) {
    // Clean up temp dirs on error
    if (fs.existsSync(inputDir)) fs.rmSync(inputDir, { recursive: true, force: true });
    if (fs.existsSync(outputDirLocal)) fs.rmSync(outputDirLocal, { recursive: true, force: true });
    console.error(err);
    res.status(500).json({ message: "Internal error during conversion." });
  }
});

// Handle OPTIONS requests for YouTube endpoint
router.options("/youtube", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// YouTube Downloader endpoint
router.post("/youtube", async (req, res) => {
  const url = req.body.url;
  const quality = req.body.quality || "best"; // Default to best quality if not specified
  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "No YouTube URL provided." });
  }

  const ip = getClientIP(req);
  
  // Check for authentication token
  const authHeader = req.headers.authorization;
  let userId = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.substring(7);
      const jwt = require('jsonwebtoken');
      const { JWT_SECRET } = require('../config/jwt');
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('YouTube route - Decoded token:', decoded);
      userId = decoded.id || decoded.userId; // Try both 'id' and 'userId'
      console.log('YouTube route - User ID:', userId);
    } catch (err) {
      console.error('Token verification failed:', err);
      // Continue without user ID (guest mode)
    }
  }

  const timestamp = Date.now();
  const tempBase = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempBase)) fs.mkdirSync(tempBase, { recursive: true });
  const outputDirLocal = path.join(tempBase, `${timestamp}_yt`);
  fs.mkdirSync(outputDirLocal, { recursive: true });

  try {
    // Download video using Python script with yt-dlp Python package
    const pythonArgs = [
      path.join(__dirname, "..", "converter", "youtube_downloader.py"),
      url,
      outputDirLocal
    ];
    const pythonProcess = spawn("python", pythonArgs);

    pythonProcess.stderr.on("data", (data) => console.error(`[Python] ${data}`));
    pythonProcess.stdout.on("data", (data) => console.log(`[Python] ${data}`));

    pythonProcess.on("close", async (code) => {
      if (code !== 0) {
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        return res.status(500).json({ message: "Failed to download video." });
      }

      // Get the downloaded file
      const files = fs.readdirSync(outputDirLocal);
      if (files.length === 0) {
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        return res.status(500).json({ message: "No files downloaded." });
      }

      const downloadedFile = files[0];
      const filePath = path.join(outputDirLocal, downloadedFile);
      const fileExt = path.extname(downloadedFile);
      
      // Create both direct file and zip downloads
      const directFilename = `${uuidv4()}${fileExt}`;
      const directPath = path.join(outputDir, directFilename);
      
      const zipFilename = `${uuidv4()}.zip`;
      const zipPath = path.join(outputDir, zipFilename);

      // Copy file for direct download
      fs.copyFileSync(filePath, directPath);

      // Create zip
      const output = fs.createWriteStream(zipPath);
      const archiver = require("archiver");
      const archive = archiver("zip");

      archive.pipe(output);
      archive.directory(outputDirLocal, false);
      archive.finalize();

      output.on("close", async () => {
        // Quota and usage logic
        console.log('YouTube route - User ID for quota check:', userId);
        if (userId) {
          console.log('YouTube route - Updating user conversion count');
          await User.findByIdAndUpdate(userId, { $inc: { convertedCount: 1 } });
        } else {
          console.log('YouTube route - Checking visitor quota for IP:', ip);
          let visitor = await Visitor.findOne({ ip });
          if (!visitor) visitor = new Visitor({ ip, count: 0, lastReset: new Date() });

          const now = new Date();
          const oneDay = 24 * 60 * 60 * 1000;
          if (now - visitor.lastReset > oneDay) {
            visitor.count = 0;
            visitor.lastReset = now;
          }

          console.log('YouTube route - Visitor count:', visitor.count);
          if (visitor.count >= 10) {
            console.log('YouTube route - Quota exceeded for visitor');
            // Clean up temp dirs and files if quota exceeded
            fs.rmSync(outputDirLocal, { recursive: true, force: true });
            fs.rmSync(zipPath, { force: true });
            fs.rmSync(directPath, { force: true });
            return res.status(403).json({ message: "Quota exceeded" });
          }

          visitor.count += 1;
          await visitor.save();
        }

        res.json({ 
          downloadUrl: `/outputs/${zipFilename}`,
          directDownloadUrl: `/outputs/${directFilename}`,
          fileName: downloadedFile,
          fileType: fileExt
        });
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
      });

      archive.on("error", (err) => {
        fs.rmSync(outputDirLocal, { recursive: true, force: true });
        if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });
        if (fs.existsSync(directPath)) fs.rmSync(directPath, { force: true });
        console.error("Archiver error:", err);
        res.status(500).json({ message: "Failed to create zip archive." });
      });
    });
  } catch (err) {
    if (fs.existsSync(outputDirLocal)) fs.rmSync(outputDirLocal, { recursive: true, force: true });
    console.error(err);
    res.status(500).json({ message: "Internal error during YouTube download." });
  }
});

module.exports = router;
