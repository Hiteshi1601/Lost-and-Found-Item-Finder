import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import ImageModel from "./models/ImageModel.js";
import { compareImages } from "./compare.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const atlasUri = "mongodb+srv://<username>:<password>@<cluster-url>/lostfoundDB?retryWrites=true&w=majority";

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: Convert buffer to base64
const bufferToBase64 = (buffer) => buffer.toString('base64');

// Upload user image
app.post("/upload-user", upload.single("image"), async (req, res) => {
  const base64Data = bufferToBase64(req.file.buffer);
  const img = new ImageModel({ type: "user", data: base64Data });
  await img.save();
  res.json({ message: "User image uploaded" });
});

// Upload CCTV image
app.post("/upload-cctv", upload.single("image"), async (req, res) => {
  const base64Data = bufferToBase64(req.file.buffer);
  const img = new ImageModel({ type: "cctv", data: base64Data });
  await img.save();
  res.json({ message: "CCTV image uploaded" });
});

// Compare latest images
app.get("/compare", async (req, res) => {
  const userImage = await ImageModel.findOne({ type: "user" }).sort({ createdAt: -1 });
  const cctvImage = await ImageModel.findOne({ type: "cctv" }).sort({ createdAt: -1 });

  if (!userImage || !cctvImage) return res.json({ error: "Both images not uploaded yet" });

  // Temporary files for Jimp
  const tempDir = path.join(process.cwd(), "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const userPath = path.join(tempDir, "user.png");
  const cctvPath = path.join(tempDir, "cctv.png");

  fs.writeFileSync(userPath, Buffer.from(userImage.data, 'base64'));
  fs.writeFileSync(cctvPath, Buffer.from(cctvImage.data, 'base64'));

  const similarity = await compareImages(userPath, cctvPath);
  const status = similarity > 60 ? "Match Found" : "No Match";

  // Clean up temporary files
  fs.unlinkSync(userPath);
  fs.unlinkSync(cctvPath);

  res.json({
    similarity,
    status
  });
});

app.listen(5000, () => console.log("server is running on port 5000"));