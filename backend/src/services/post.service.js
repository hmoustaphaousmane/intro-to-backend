import { Post } from "../models/post.model.js";

const createPost = async (data) => {
  return await Post.create(data);
};

const getAllPosts = async () => {
  return await Post.find().sort({ createdAt: -1 });
};

const getPostById = async (id) => {
  return await Post.findById(id);
};

const updatePost = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
