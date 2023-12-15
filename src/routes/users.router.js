import express from "express";
import {
  createUser,
  deleteUser,
  getStudents,
  getTeachers,
  changeUserPassword,
  changeUserEmail,
  registerStudent,
  registerTeacher,
} from "../controllers/users.controller.js";
import { authRequired, isStudent, isTeacher } from "../middlewares.js";

const userRouter = express.Router();
userRouter.get("/students", getStudents);
userRouter.get("/teachers", getTeachers);
userRouter.post("/students", registerStudent);
userRouter.post("/teachers", authRequired, isTeacher(), registerTeacher);
userRouter.post("/", authRequired, createUser);
userRouter.put("/password", authRequired, changeUserPassword);
userRouter.put("/email", authRequired, changeUserEmail);
userRouter.delete("/", authRequired, isTeacher(), deleteUser);

export default userRouter;
