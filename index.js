import express from 'express';
import userRouter from './src/routes/users.router.js';
import { PORT } from './src/configs/environment.js';
import connectDB from './src/configs/mongodb.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();