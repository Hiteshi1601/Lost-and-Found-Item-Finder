const express = require("express");
const multer = require("multer");
const path = require("path");
const compareImages = require("../ai/compareImages");

const router = express.Router();

// Storage for CCTV images
router.post("/match", async (req, res) => {
  try {
    const cctvImage = req.body.cctvPath;
    const userImage = req.body.userPath;

    const result = await compareImages(cctvImage, userImage);

    if (result.isMatch) {
      return res.json({ matched: true, similarity: `${100 - result.diffPercent}%` });
    } else {
      return res.json({ matched: false, difference: `${result.diffPercent}%` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image comparison failed" });
  }
});