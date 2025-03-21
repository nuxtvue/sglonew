import Comment from "../models/Comment.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

// Получить все комментарии для конкретного блога с пагинацией
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const query = { blog: blogId };

    // Если пользователь не админ, показываем только одобренные комментарии
    if (!req.user?.role === "admin") {
      query.status = "approved";
    }

    const total = await Comment.countDocuments(query);
    const comments = await Comment.find(query)
      .populate("user", "login")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      comments,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + comments.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать новый комментарий
export const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.id;

    const comment = new Comment({
      content,
      blog: blogId,
      user: userId,
      status: "pending", // Новые комментарии требуют модерации
    });
    const blog = await Blog.findById(blogId);
    blog.comments.push(comment._id);
    await blog.save();

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение всех комментариев с пагинацией и фильтрацией
export const getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    // Создаем объект запроса
    const query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    // Получаем комментарии с пагинацией
    const comments = await Comment.find(query)
      .populate("user", "login")
      .populate("blog", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Получаем общее количество комментариев для пагинации
    const total = await Comment.countDocuments(query);

    res.json({
      comments,
      hasMore: total > skip + comments.length,
      total,
    });
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    res.status(500).json({ message: "Ошибка при получении комментариев" });
  }
};

// Модерация комментария
export const moderateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { status } = req.body;
    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Нет прав на модерацию комментария" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    comment.status = status;

    comment.moderatedBy = req.id;
    comment.moderatedAt = new Date();
    await comment.save();

    res.json({ message: "Статус комментария обновлен", comment });
  } catch (error) {
    console.error("Ошибка при модерации комментария:", error);
    res.status(500).json({ message: "Ошибка при модерации комментария" });
  }
};

// Удалить комментарий (опционально, для модерации)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }
    const user = await User.findOne({ _id: req.id });
    // Проверяем права на удаление
    if (
      user.role !== "admin" &&
      comment.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Нет прав на удаление комментария" });
    }
    const blog = await Blog.findById(comment.blog);
    blog.comments = blog.comments.filter((id) => id.toString() !== commentId);
    await blog.save();

    await comment.deleteOne();
    res.json({ message: "Комментарий удален" });
  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    res.status(500).json({ message: "Ошибка при удалении комментария" });
  }
};
