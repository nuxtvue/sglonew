import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { login, email, password } = req.body;
  if (!login || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Вы заполнили не все поля" });
  }

  const existingUser = await User.findOne({ login });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Пользователь уже существует" });
  }
  const allusers = await User.find();
  let userrole = "";
  if (allusers.length === 0) {
    userrole = "admin";
  } else {
    userrole = "user";
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    login,
    email,
    password: hashedPassword,
    role: userrole,
  });
  await user.save();
  res
    .status(201)
    .json({ success: true, message: "Пользователь успешно создан" });
};

export const login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Пользователь не найден" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ success: false, message: "Неверный пароль" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Успешный вход",
    user: {
      email: user.email,
      role: user.role,
      id: user._id,
      login: user.login,
    },
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Вы успешно вышли" });
};
