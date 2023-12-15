import express from "express";
import {
  createCourse,
  deleteCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  getStudentCourses,
  getTeacherCourses,
  getStudentCourseAttendances,
  getStudentsFromCourse,
} from "../controllers/courses.controller.js";
import { authRequired, isStudent, isTeacher } from "../middlewares.js";

const courseRouter = express.Router();
courseRouter.delete("/:courseCode", authRequired, isTeacher(), deleteCourse);
courseRouter.get(
  "/:courseCode/students",
  authRequired,
  isTeacher(),
  getStudentsFromCourse
);
courseRouter.post("/", authRequired, isTeacher(), createCourse);
courseRouter.get(
  "/getStudentCourses",
  authRequired,
  isStudent(),
  getStudentCourses
);
courseRouter.get(
  "/getTeacherCourses",
  authRequired,
  isTeacher(),
  getTeacherCourses
);
courseRouter.get(
  "/:courseCode/getAttendances",
  authRequired,
  isStudent(),
  getStudentCourseAttendances
);
courseRouter.patch(
  "/students/add",
  authRequired,
  isTeacher(),
  addStudentToCourse
);
courseRouter.patch(
  "/students/remove",
  authRequired,
  isTeacher(),
  removeStudentFromCourse
);
courseRouter.get(
  "/:courseId/students/attendances/:studentId",
  getStudentCourseAttendances
);

export default courseRouter;
