import express from 'express';
import {
    createCourse,
    deleteCourse,
    addStudentToCourse,
    removeStudentFromCourse,
} from '../controllers/courses.controller.js';

const courseRouter = express.Router();
courseRouter.delete('/', deleteCourse);
courseRouter.post('/', createCourse);
courseRouter.patch('/:courseId/students/add/:studentId', addStudentToCourse);
courseRouter.patch('/:courseId/students/remove/:studentId', removeStudentFromCourse);

export default courseRouter;