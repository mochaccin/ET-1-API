import express from 'express';
import {
  createTest
} from '../controllers/tests.controller.js';

const testRouter = express.Router();
testRouter.post('/', createTest);

export default testRouter;