import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static("static"));

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

export default app;
