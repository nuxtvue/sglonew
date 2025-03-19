import { Blog } from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { unlink } from "fs/promises";
import { nanoid } from "nanoid";
import { sharpImage } from "../middlewares/sharp.js";
import { translit } from "./../utils/translit.js";
import { User } from "../models/user.model.js";

export const getBlogByRegion = async (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
    let query = { region: slug };
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    if (startDate && endDate) {
      query.createdDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      success: true,
      posts: blogs,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении постов",
      error: error.message,
    });
  }
};

export const getBlogByUrl = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ url: slug });
    if (blog) {
      blog.views++;
      await blog.save();
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Блог не найден" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (req, res) => {
  let { page } = req.query;
  let maxLimit = 12;
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
      tag: category,
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

export const searchBlogs = async (req, res) => {
  const { query } = req.params;
  try {
    const blogs = await Blog.find({
      title: { $regex: query, $options: "i" },
    });
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

export const countDocsByTag = async (req, res) => {
  try {
    const tags = await Blog.aggregate([
      { $group: { _id: "$region", count: { $sum: 1 } } },
    ]).sort({ count: -1 });
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    let isAdmin = await User.findById(req.id);
    if (isAdmin.role !== "admin")
      return res.status(403).json({ message: "Недостаточно прав" });
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      blog.coverImageName.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.log(err);
        });
      });
    }
    res.status(200).json({ message: "Блог успешно удален", blog });
  } catch (error) {
    console.log(error);
  }
};

export const countDocsByCategory = async (req, res) => {
  try {
    const tags = await Blog.aggregate([
      { $group: { _id: "$tag", count: { $sum: 1 } } },
    ]).sort({ count: -1 });
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
    const total = await Blog.countDocuments({ tag: category });
    const blogs = await Blog.find({ tag: category })
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      success: true,
      posts: blogs,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении постов",
      error: error.message,
    });
  }
};

export const countByTags = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          _id: { $ne: null }, // Исключаем записи без региона
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Ошибка при получении статистики:", error);
    res.status(500).json({ message: "Ошибка при получении статистики" });
  }
};
