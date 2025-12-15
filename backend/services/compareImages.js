const Jimp = require("jimp");
const pixelmatch = require("pixelmatch");

async function compareImages(img1Path, img2Path) {
  const img1 = await Jimp.read(img1Path);
  const img2 = await Jimp.read(img2Path);

  // Resize images to same size
  img2.resize(img1.bitmap.width, img1.bitmap.height);

  const diff = new Jimp(img1.bitmap.width, img1.bitmap.height);

  const diffPixels = pixelmatch(
    img1.bitmap.data,
    img2.bitmap.data,
    diff.bitmap.data,
    img1.bitmap.width,
    img1.bitmap.height,
    { threshold: 0.1 }
  );

  const totalPixels = img1.bitmap.width * img1.bitmap.height;
  const diffPercent = (diffPixels / totalPixels) * 100;

  return diffPercent;
}

module.exports = compareImages;