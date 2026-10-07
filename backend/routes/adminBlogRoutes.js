import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadBlog from "../middleware/uploadBlog.js";

import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostAdmin,
  listBlogPostsAdmin,
  updateBlogPost,
} from "../controllers/adminBlogController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listBlogPostsAdmin);
router.post("/", uploadBlog.single("image"), createBlogPost);
router.get("/:id", getBlogPostAdmin);
router.patch("/:id", uploadBlog.single("image"), updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;