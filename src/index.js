import express from "express";
import userRouter from "./routes/users.router.js";
import courseRouter from "./routes/courses.router.js";
import authRouter from "./routes/auth.router.js";
import { PORT } from "./configs/environment.js";
import connectDB from "./configs/mongodb.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/auth", authRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();
