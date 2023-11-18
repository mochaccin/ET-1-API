import express from 'express';
import {
  createUser,
  deleteUser,
  getStudents,
  getTeachers,
  changeUserPassword,
  changeUserEmail
} from '../controllers/users.controller.js';

const userRouter = express.Router();
userRouter.get('/students', getStudents);
userRouter.get('/teachers', getTeachers);
userRouter.post('/', createUser);
userRouter.put('/:userId/password', changeUserPassword);
userRouter.put('/:userId/email', changeUserEmail);
userRouter.delete('/', deleteUser);

export default userRouter;