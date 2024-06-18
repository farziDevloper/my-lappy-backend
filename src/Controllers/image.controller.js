const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const router = express.Router();

// Set up storage with Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

// Route to handle file upload
router.post("/", upload.any(), function (req, res) {
  if (req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  // Log the uploaded files information
  req.files.forEach((file) => {
    console.log(
      `Uploaded file: ${file.originalname}, Saved as: ${file.filename}`
    );
  });

  res.send("Files uploaded successfully.");
});

router.get("/get-images", function (req, res) {
  const uploadPath = path.join(__dirname, "uploads");

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files.");
    }

    // Filter to only include image files (based on extensions)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/.test(file)
    );

    const imageUrls = imageFiles.map((file) => `/uploads/${file}`);

    res.json(imageUrls);
  });
});

module.exports = router;
