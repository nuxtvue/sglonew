import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logout,
  makeAdmin,
  register,
  getUserRegistrationStats,
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getallusers", getAllUsers);
router.put("/makeadmin/:id", isAuthenticated, makeAdmin);
router.delete("/deleteuser/:id", isAuthenticated, deleteUser);
router.get("/registrationstats", getUserRegistrationStats);

export default router;
