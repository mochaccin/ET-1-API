import express from "express";
import userRouter from "./routes/users.router.js";
import courseRouter from "./routes/courses.router.js";
import { PORT } from "./configs/environment.js";
import connectDB from "./configs/mongodb.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/courses", courseRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();
