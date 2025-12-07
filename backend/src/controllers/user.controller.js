import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // check if user exists already
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // hash the password
    // const hash = bcrypt.hashSync(password, 10);

    // create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered.",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(400).json({ message: "User not found." });

    // check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json({
      message: "User logged in.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

export { registerUser, loginUser };
