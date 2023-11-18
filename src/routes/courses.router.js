import express from 'express';
import {
  createCourse
} from '../controllers/courses.controller.js';

const courseRouter = express.Router();
courseRouter.post('/', createCourse);

export default courseRouter;