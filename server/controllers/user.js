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
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Пользователь не найден" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Неверный пароль" });
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ошибка при входе" });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ login: 1 });
  res.json(users);
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Вы успешно вышли" });
};

export const makeAdmin = async (req, res) => {
  try {
    const isAdmin = await User.findById(req.id);
    const { id } = req.params;
    if (isAdmin.role === "admin") {
      const user = await User.findById(id);
      if (user.role === "admin") {
        user.role = "user";
      } else {
        user.role = "admin";
      }
      await user.save();
      res.json(user);
    } else {
      res.status(403).json({ message: "Недостаточно прав" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = await User.findById(req.id);
    if (isAdmin.role === "admin") {
      const user = await User.findByIdAndDelete(id);
      res.json(user);
    } else {
      res.status(403).json({ message: "Недостаточно прав" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserRegistrationStats = async (req, res) => {
  try {
    // Проверяем, является ли пользователь администратором
    const isAdmin = await User.findById(req.id);
    if (!isAdmin || isAdmin.role !== "admin") {
      return res.status(403).json({ message: "Недостаточно прав" });
    }

    const stats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    console.error("Ошибка при получении статистики регистраций:", err);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении статистики регистраций",
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  res.json(user);
};
