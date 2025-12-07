import express from "express";

// routes imports
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express(); // create an express app

// Middlewares
app.use(express.json());

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
