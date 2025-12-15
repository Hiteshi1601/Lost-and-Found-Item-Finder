import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Item", ItemSchema);