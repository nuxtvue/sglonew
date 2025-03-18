import express from "express";
import isAuthenticated from "./../middlewares/isAuthenticated.js";
import upload from "./../middlewares/multer.js";
import {
  countDocsByCategory,
  countDocsByTag,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBannerBlogs,
  getBlogByRegion,
  getBlogByUrl,
  searchBlogs,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/getblogsbyregion/:slug", getBlogByRegion);
router.get("/getblogbyurl/:slug", getBlogByUrl);
router.get("/getallblogs", getAllBlogs);
router.get("/banner", getBannerBlogs);
router.post("/newblog", upload.array("files", 15), isAuthenticated, createBlog);
router.get("/search/:query", searchBlogs);
router.get("/countbytags", countDocsByTag);
router.get("/countbycategory", countDocsByCategory);
router.delete("/deleteblog/:id", isAuthenticated, deleteBlog);

export default router;
