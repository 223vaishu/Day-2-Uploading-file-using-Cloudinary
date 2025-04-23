const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

const router = express.Router();

// Use Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: stream buffer to Cloudinary
function streamUpload(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    Readable.from(fileBuffer).pipe(stream);
  });
}

// Upload route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await streamUpload(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});




module.exports = router;
