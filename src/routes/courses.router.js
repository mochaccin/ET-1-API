import express from "express";
import {
  createCourse,
  deleteCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  getCoursesByStudentId,
  getCoursesByTeacherId,
  getStudentCourseAttendances,
} from "../controllers/courses.controller.js";

const courseRouter = express.Router();
courseRouter.delete("/", deleteCourse);
courseRouter.post("/", createCourse);
courseRouter.get("/students/:studentId", getCoursesByStudentId);
courseRouter.get("/teachers/:teacherId", getCoursesByTeacherId);
courseRouter.patch("/:courseId/students/add/:studentId", addStudentToCourse);
courseRouter.patch(
  "/:courseId/students/remove/:studentId",
  removeStudentFromCourse
);
courseRouter.get(
  "/:courseId/students/attendances/:studentId",
  getStudentCourseAttendances
);

export default courseRouter;
