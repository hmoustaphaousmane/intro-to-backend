import { Router } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getPostsHandler,
  getSinglePostHandler,
  updatePostHandler,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPostHandler);
router.route("/list").get(getPostsHandler);
router.route("/read/:id").get(getSinglePostHandler);
router.route("/update/:id").patch(updatePostHandler);
router.route("/delete/:id").delete(deletePostHandler);

export default router;
