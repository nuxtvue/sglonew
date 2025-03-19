import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";

// Получить количество лайков для статьи и информацию о лайке текущего пользователя
export const getLikes = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Блог не найден" });
    }

    const userLiked = userId ? blog.likes.includes(userId) : false;
    const likesCount = blog.likes.length;

    res.json({ count: likesCount, userLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Поставить/убрать лайк
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Блог не найден" });
    }

    const likeIndex = blog.likes.includes(userId);
    console.log(likeIndex);
    if (likeIndex === true) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await blog.save();
      res.json({ count: blog.likes.length, userLiked: false });
    } else {
      blog.likes.push(userId);
      await blog.save();
      res.json({ count: blog.likes.length, userLiked: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
