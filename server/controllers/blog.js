import { Blog } from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { unlink } from "fs/promises";
import { nanoid } from "nanoid";

export const getBlogByRegion = async (req, res) => {
  const { slug } = req.params;
  let { page } = req.query;
  let maxLimit = 9;
  const skip = (page - 1) * maxLimit;
  try {
    const blogs = await Blog.find({ region: slug })
      .skip(skip) // Пропустить первые N документов
      .limit(maxLimit) // Ограничить количество документов
      .sort({ createdDate: -1 })
      .exec();
    console.log(blogs);

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogByUrl = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ url: slug });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (req, res) => {
  let { page } = req.query;
  let maxLimit = 9;
  const skip = (page - 1) * maxLimit;
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip) // Пропустить первые N документов
      .limit(maxLimit) // Ограничить количество документов
      .sort({ createdDate: -1 })
      .exec();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};
const dir = "./static/optimized";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const createBlog = async (req, res) => {
  try {
    const files = req.files; // Получаем файлы из запроса
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Файлы не были загружены." });
    }
    const optimizedFiles = [];
    for (const file of files) {
      const optimizedFilePath = path.join(
        dir,
        `${Date.now()}-${file.originalname}`
      );
      await sharp(file.buffer)
        .resize(800, 600, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 500 },
        })
        .toFormat("webp")
        .webp({ quality: 80 })
        .toFile(optimizedFilePath);

      optimizedFiles.push({
        originalName: file.originalname,
        optimizedPath: `/optimized/${path.basename(optimizedFilePath)}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
