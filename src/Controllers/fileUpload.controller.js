const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = require("../MiddleWare/Upload");
const mongoose = require("mongoose");
// Set saved storage options:

const imageSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage: storage });
const Image = mongoose.model("Image", imageSchema);

router.post("/", upload.array("images", 30), async (req, res) => {
  try {
    const files = req.files;

    if (!files) {
      return res.status(400).send("No files uploaded.");
    }

    const images = files.map((file) => ({
      img: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    }));

    await Image.insertMany(images);

    res.send("Files uploaded successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({});
    const imagesWithUrls = images.map((image) => ({
      id: image._id,
      contentType: image.img.contentType,
      url: `${req.protocol}://${req.get("host")}/images/${image._id}`,
    }));
    res.json(imagesWithUrls);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});
router.get("/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send("Image not found.");
    }
    res.set("Content-Type", image.img.contentType);
    res.send(image.img.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
