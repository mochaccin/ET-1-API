import express from 'express';
import {
  createMarks
} from '../controllers/marks.controller.js';

const marksRouter = express.Router();
marksRouter.post('/', createMarks);

export default marksRouter;