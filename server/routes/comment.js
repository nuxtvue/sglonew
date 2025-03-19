import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Получить комментарии для конкретного блога
router.get("/:blogId", getComments);

// Создать новый комментарий (только для авторизованных пользователей)
router.post("/:blogId", isAuthenticated, createComment);

// Удалить комментарий (только для авторизованных пользователей)
router.delete("/:commentId", isAuthenticated, deleteComment);

export default router;
