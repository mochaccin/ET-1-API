import mongoose from 'mongoose';
import { MONGO_URI } from './environment.js';

async function connectDB() {
  console.log('Trying connect to database...');
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database 😎');
      return true;
    })
    .catch((error) => {
      console.log(error);
      process.exit(-1);
    });
}

export default connectDB;