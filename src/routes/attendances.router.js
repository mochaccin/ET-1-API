import express from 'express';
import {
  createAttendance
} from '../controllers/attendances.controller.js';

const attendanceRouter = express.Router();
attendanceRouter.post('/', createAttendance);

export default attendanceRouter;