import { Blog } from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { unlink } from "fs/promises";
import { nanoid } from "nanoid";
import { sharpImage } from "../middlewares/sharp.js";
import { translit } from "./../utils/translit.js";

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

export const createBlog = async (req, res) => {
  try {
    let { title, description, region, category, banner, content } = req.body;
    const files = req.files; // Получаем файлы из запроса
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Файлы не были загружены." });
    }
    if (!title || !description || !content || !region || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Вы заполнили не все поля" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Вы не выбрали категорию" });
    }

    const slug =
      translit(title)
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .trim() +
      "-" +
      nanoid(2);
    const findBlogBySlug = await Blog.findOne({ slug: slug });
    const findBlogByTitle = await Blog.findOne({ title: title });
    if (findBlogBySlug || findBlogByTitle) {
      return res.status(400).json({
        success: false,
        message: "Блог с таким заголовком уже существует, поменяйте заголовок",
      });
    }

    const optimizedFiles = await sharpImage(files); // Обрабатываем файлы
    content = JSON.parse(req.body.content);
    const newBlog = new Blog({
      title,
      h1: title,
      url: slug.toLowerCase(),
      description,
      coverImageName: optimizedFiles,
      content,
      region,
      banner,
      category,
      author: req.id,
    });
    await newBlog.save();
    res.status(201).json({ success: true, message: "Блог успешно создан" });
  } catch (error) {
    console.log(error);
  }
};

export const getBannerBlogs = async (req, res) => {
  try {
    const blog = await Blog.find({ banner: true });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};
