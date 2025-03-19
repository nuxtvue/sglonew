import Comment from "../models/Comment.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

// Получить все комментарии для конкретного блога
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать новый комментарий
export const createComment = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const newComment = new Comment({
      content: req.body.content,
      blog: req.params.blogId,
      user: user,
    });
    const savedComment = await newComment.save();
    const populatedComment = await Comment.findById(savedComment._id).populate(
      "user",
      "name"
    );
    res.status(201).json(populatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Удалить комментарий (опционально, для модерации)
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Комментарий успешно удален" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
