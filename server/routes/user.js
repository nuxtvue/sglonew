import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logout,
  makeAdmin,
  register,
  getUserRegistrationStats,
  getUserById,
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/allusers", isAuthenticated, getAllUsers);
router.get("/user/:id", isAuthenticated, getUserById);
router.delete("/deleteuser/:id", isAuthenticated, deleteUser);
router.put("/makeadmin/:id", isAuthenticated, makeAdmin);
router.get("/registrationstats", isAuthenticated, getUserRegistrationStats);

export default router;
