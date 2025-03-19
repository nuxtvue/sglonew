import { error } from "console";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { translit } from "../utils/translit.js";

const dir = "./static/optimized";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const sanitizeFileName = (fileName) => {
  // Декодируем имя файла из UTF-8
  const decodedName = decodeURIComponent(fileName);
  // Транслитерируем и очищаем имя файла
  const cleanName = translit(decodedName)
    .replace(/[^\w\-\.]/g, "") // Оставляем только буквы, цифры, точки и дефисы
    .replace(/\.+/g, ".") // Убираем множественные точки
    .toLowerCase();

  // Добавляем расширение .webp, так как конвертируем в этот формат
  return cleanName.replace(/\.[^/.]+$/, "") + ".webp";
};

export const sharpImage = async (files) => {
  const optimizedFiles = [];
  try {
    for (const file of files) {
      // Очищаем и подготавливаем имя файла
      const cleanFileName = sanitizeFileName(file.originalname);

      const optimizedFilePath = path.join(
        dir,
        `${Date.now()}-${cleanFileName}`
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
        originalname: cleanFileName,
        path: `static/optimized/${path.basename(optimizedFilePath)}`,
        size: fs.statSync(optimizedFilePath).size,
      });
    }

    return optimizedFiles;
  } catch (err) {
    console.error(err);
    return false;
  }
};
