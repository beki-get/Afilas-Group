import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
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
router.post("/", createBlogPost);
router.get("/:id", getBlogPostAdmin);
router.patch("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
