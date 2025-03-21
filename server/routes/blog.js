import express from "express";
import isAuthenticated from "./../middlewares/isAuthenticated.js";
import upload from "./../middlewares/multer.js";
import {
  countDocsByCategory,
  countByTags,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBannerBlogs,
  getBlogByRegion,
  getBlogByUrl,
  getBlogsByCategory,
  searchBlogs,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/getblogsbyregion/:slug", getBlogByRegion);
router.get("/getblogbyurl/:slug", getBlogByUrl);
router.get("/getallblogs", getAllBlogs);
router.get("/banner", getBannerBlogs);
router.post("/newblog", upload.array("files", 15), isAuthenticated, createBlog);
router.get("/search/:query", searchBlogs);
router.get("/countbytags", isAuthenticated, countByTags);
router.get("/countbycategory", countDocsByCategory);
router.get("/getblogsbycategory/:category", getBlogsByCategory);
router.delete("/deleteblog/:id", isAuthenticated, deleteBlog);

export default router;
