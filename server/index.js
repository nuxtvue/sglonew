import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import cookieParser from "cookie-parser";
import sharp from "sharp";
import multer from "multer";
import path from "path";

import commentRoute from "./routes/comment.js";
import likeRoute from "./routes/like.js";
import { generateSitemap } from "./controllers/sitemap.js";

dotenv.config();

const app = express();
app.use(cookieParser());
// Добавление маршрута для sitemap.xml
app.get("/sitemap.xml", generateSitemap);
// Добавление маршрута для sitemap.xml

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "7mb" }));

app.use("/static", express.static("static"));
app.use(urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comments", commentRoute);
app.use("/api/likes", likeRoute);

export default app;
