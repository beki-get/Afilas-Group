import express from "express";

import {
  listPublishedBlogPosts,
  getPublishedBlogPostBySlug,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", listPublishedBlogPosts);

router.get("/:slug", getPublishedBlogPostBySlug);

export default router;