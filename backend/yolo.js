import { YOLOv5 } from "yolov5-node";

let model;

// Load YOLOv5 once
export const loadModel = async () => {
  if (!model) {
    model = await YOLOv5.load("yolov5s"); // small YOLOv5 model
  }
  return model;
};

// Detect object in image
export const detectObject = async (imagePath) => {
  const model = await loadModel();
  const detections = await model.detect(imagePath);

  if (detections.length > 0) {
    return detections[0].class; // first detected object
  }
  return "Unknown";
};