import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../services/post.service.js";

// Create a post
const createPostHandler = async (req, res, next) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age)
      return res.status(400).json({ message: "All fields are required." });

    const post = await createPost({ name, description, age });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    next(error);
  }
};

// Read all posts
const getPostsHandler = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({ length: posts.length, posts });
  } catch (error) {
    next(error);
  }
};

const getSinglePostHandler = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePostHandler = async (req, res, next) => {
  try {
    // Basic validation to if the body is empty
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ message: "No data provided for update" });

    const post = await updatePost(req.params.id, req.body);

    if (!post) return res.status(404).json({ message: "Post not found." });

    res.status(200).json({ messages: "Post updated successfully.", post });
  } catch (error) {
    next(error);
  }
};

const deletePostHandler = async (req, res, next) => {
  try {
    const deleted = await deletePost(req.params.id);

    if (!deleted) res.status(404).json({ message: "Post not found." });

    res.status(200).json({ message: "Post successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export {
  createPostHandler,
  getPostsHandler,
  getSinglePostHandler,
  updatePostHandler,
  deletePostHandler,
};
