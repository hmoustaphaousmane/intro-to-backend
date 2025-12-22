import { createUser, getUserByEmail } from "../services/user.service.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // check if user exists already
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // create user
    const user = await createUser({
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
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await getUserByEmail(email);

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
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};
export { registerUser, loginUser, logoutUser };
