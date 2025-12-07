import express from "express";

// routes imports
import userRouter from "./routes/user.route.js";

const app = express(); // create an express app

// Middlewares
app.use(express.json());

// routes declaration
app.use("/api/v1/users", userRouter);

export default app;
