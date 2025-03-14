import express from "express";
import isAuthenticated from "./../middlewares/isAuthenticated.js";
import upload from "./../middlewares/multer.js";
import {
  createBlog,
  getAllBlogs,
  getBannerBlogs,
  getBlogByRegion,
  getBlogByUrl,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/getblogsbyregion/:slug", getBlogByRegion);
router.get("/getblogbyurl/:slug", getBlogByUrl);
router.get("/getallblogs", getAllBlogs);
router.get("/banner", getBannerBlogs);
router.post("/newblog", upload.array("files", 15), isAuthenticated, createBlog);

export default router;
