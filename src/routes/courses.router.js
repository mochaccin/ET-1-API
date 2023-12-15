import express from "express";
import {
  createCourse,
  deleteCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  getStudentCourses,
  getTeacherCourses,
  getStudentCourseAttendances,
} from "../controllers/courses.controller.js";
import { authRequired, isStudent, isTeacher } from "../middlewares.js";

const courseRouter = express.Router();
courseRouter.delete("/", authRequired, isTeacher(),  deleteCourse);
courseRouter.post("/", createCourse);
courseRouter.get("/students/:studentId", authRequired, isStudent(), getStudentCourses);
courseRouter.get("/teachers/:teacherId", authRequired, isTeacher(), getTeacherCourses);
courseRouter.patch("/:courseId/students/add/:studentId", authRequired, isTeacher(),  addStudentToCourse);
courseRouter.patch(
  "/:courseId/students/remove/:studentId", authRequired, isTeacher(), 
  removeStudentFromCourse
);
courseRouter.get(
  "/:courseId/students/attendances/:studentId",
  getStudentCourseAttendances
);

export default courseRouter;
