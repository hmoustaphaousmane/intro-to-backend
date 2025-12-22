import { User } from "../models/user.model.js";

const createUser = async (data) => {
  return await User.create(data);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

export { createUser, getUserByEmail };
