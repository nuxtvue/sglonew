import { error } from "console";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "./static/optimized";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const sharpImage = async (files) => {
  const optimizedFiles = [];
  try {
    for (const file of files) {
      const optimizedFilePath = path.join(
        dir,
        `${Date.now()}-${file.originalname}`
      );
      await sharp(file.buffer)
        .resize(1200, null, {
          fit: "inside",
          background: { r: 255, g: 255, b: 255, alpha: 500 },
        })
        .toFormat("webp")
        .webp({ quality: 80, reductionEffort: 6 })
        .toFile(optimizedFilePath);

      optimizedFiles.push({
        originalname: file.originalname,
        path: `static/optimized/${path.basename(optimizedFilePath)}`,
        size: fs.statSync(optimizedFilePath).size,
      });
    }

    return optimizedFiles;
  } catch (err) {
    console.error(error);
    return false;
  }
};
