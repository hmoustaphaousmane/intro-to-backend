import express from "express";
import morgan from "morgan";

// routes imports
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express(); // create an express app

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Error handler middleware
app.use(errorHandler);

export default app;
