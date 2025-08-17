const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");
const Visitor = require("../models/Visitor");

const uploadsDir = path.join(__dirname, "../uploads");
const convertedDir = path.join(__dirname, "../converted");
const converterScript = path.join(__dirname, "../converter/convert_batch.py");

function zipDirectory(outputDir, zipPath, callback) {
  // Use platform-specific zipping
  const isWin = process.platform === "win32";
  let zipCommand;
  if (isWin) {
    zipCommand = `powershell Compress-Archive -Path "${outputDir}\\*" -DestinationPath "${zipPath}"`;
  } else {
    // Use zip CLI on Unix-like systems
    zipCommand = `cd "${outputDir}" && zip -r "${zipPath}" .`;
  }
  exec(zipCommand, callback);
}

exports.convertImages = async (req, res) => {
  try {
    const isAuthenticated = !!req.user;
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket?.remoteAddress ||
      (req.connection && req.connection.socket && req.connection.socket.remoteAddress) ||
      "unknown";

    console.log("[CONVERT] Request received - Authenticated:", isAuthenticated, "IP:", ip);

    let files = req.files?.files;
    if (!files) {
      console.log("[CONVERT] No files uploaded");
      return res.status(400).json({ message: "No files uploaded" });
    }
    
    if (!Array.isArray(files)) {
      files = [files];
    }

    if (files.length === 0) {
      console.log("[CONVERT] Empty file array");
      return res.status(400).json({ message: "No files uploaded" });
    }

    console.log(`[CONVERT] Processing ${files.length} files`);

    // IP Rate Limiting with 24-hour Reset
    if (!isAuthenticated) {
      let visitor = await Visitor.findOne({ ip });
      const now = new Date();
      if (!visitor) {
        visitor = await Visitor.create({ ip, count: 0, lastReset: now });
      } else {
        const diffHrs = (now - visitor.lastReset) / (1000 * 60 * 60);
        if (diffHrs > 24) {
          visitor.count = 0;
          visitor.lastReset = now;
        }
      }

      if (visitor.count + files.length > 10) {
        return res.status(429).json({
          message:
            "Limit exceeded! Only 10 free conversions allowed per device every 24 hours. Please register for unlimited access.",
        });
      }

      visitor.count += files.length;
      await visitor.save();
    } else {
      await User.findByIdAndUpdate(req.user.id, { $inc: { convertedCount: files.length } });
    }

    // Prepare directories
    const batchId = uuidv4();
    const inputDir = path.join(uploadsDir, batchId);
    const outputDir = path.join(convertedDir, batchId);
    const zipPath = path.join(convertedDir, `${batchId}.zip`);

    fs.mkdirSync(inputDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });

    // Save uploaded files
    for (const file of files) {
      const savePath = path.join(inputDir, file.name);
      await file.mv(savePath);
    }

    // Python conversion
    const convertCommand = `python "${converterScript}" "${inputDir}" "${outputDir}"`;
    exec(convertCommand, (err, stdout, stderr) => {
      if (err) {
        console.error("Conversion Error:", stderr || err.message);
        return res.status(500).json({
          message: "Conversion failed. Please check file format or try again later.",
          error: stderr || err.message,
        });
      }

      // Zipping
      zipDirectory(outputDir, zipPath, async (zipErr, zipOut, zipErrOut) => {
        if (zipErr) {
          console.error("Zipping Error:", zipErrOut || zipErr.message);
          return res.status(500).json({ message: "Zipping failed", error: zipErrOut || zipErr.message });
        }

        // Log analytics (optional)
        if (isAuthenticated) {
          console.log(`[User] ${req.user.email} converted ${files.length} files`);
        } else {
          console.log(`[Visitor IP] ${ip} converted ${files.length} files`);
        }

        return res.status(200).json({
          message: "Conversion successful!",
          downloadUrl: `/download/${batchId}.zip`,
        });
      });
    });
  } catch (err) {
    console.error("Unexpected server error:", err.message);
    return res.status(500).json({ message: "Unexpected error occurred", error: err.message });
  }
};
