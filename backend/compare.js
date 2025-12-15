import Jimp from "jimp";

export async function compareImages(img1Path, img2Path) {
  const img1 = await Jimp.read(img1Path);
  const img2 = await Jimp.read(img2Path);

  img1.resize(256, 256);
  img2.resize(256, 256);

  const diff = Jimp.diff(img1, img2).percent; // 0 → 1 difference
  return diff;
}