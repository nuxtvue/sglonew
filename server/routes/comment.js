import express from "express";
import {
  getAllComments,
  moderateComment,
  deleteComment,
  createComment,
  getComments,
} from "../controllers/comment.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Получение всех комментариев (только для админов)
router.get("/", isAuthenticated, getAllComments);

// Получение комментариев для конкретного блога
router.get("/:blogId", getComments);

// Создать новый комментарий (только для авторизованных пользователей)
router.post("/:blogId", isAuthenticated, createComment);

// Удалить комментарий (только для авторизованных пользователей)
router.delete("/:commentId", isAuthenticated, deleteComment);

router.patch("/:commentId/moderate", isAuthenticated, moderateComment);

export default router;
