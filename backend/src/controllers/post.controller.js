import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res, next) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age)
      return res.status(400).json({ message: "All fields are required." });

    const post = await Post.create({ name, description, age });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    next(error);
  }
};

// Read all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    // Basic validation to if the body is empty
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ message: "No data provided for update" });

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) return res.status(404).json({ message: "Post not found." });

    res.status(200).json({ messages: "Post updated successfully.", post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) res.status(404).json({ message: "Post not found." });

    res.status(200).json({ message: "Post successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPosts, updatePost, deletePost };
