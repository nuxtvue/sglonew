import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Вы заполнили не все поля" });
  }

  const existingUser = await User.findOne({ email });
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
    username,
    email,
    password: hashedPassword,
    role: userrole,
  });
  await user.save();
  res
    .status(201)
    .json({ success: true, message: "Пользователь успешно создан" });
};
