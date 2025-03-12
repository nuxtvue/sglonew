import express from "express";
import { getBlogByRegion, getBlogByUrl } from "../controllers/blog.js";

const router = express.Router();

router.get("/getblogsbyregion/:slug", getBlogByRegion);
router.get("/getblogbyurl/:slug", getBlogByUrl);

export default router;
