import express from "express";
import {
  getAllBlogs,
  getBlogByRegion,
  getBlogByUrl,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/getblogsbyregion/:slug", getBlogByRegion);
router.get("/getblogbyurl/:slug", getBlogByUrl);
router.get("/getallblogs", getAllBlogs);

export default router;
