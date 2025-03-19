import express from "express";
import { getLikes, toggleLike } from "../controllers/like.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Получить информацию о лайках
router.get("/:blogId", getLikes);

// Поставить/убрать лайк (только для авторизованных пользователей)
router.post("/:blogId", isAuthenticated, toggleLike);

export default router;
