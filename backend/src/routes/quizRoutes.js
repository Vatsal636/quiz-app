import express from 'express';
import { getQuizzes, getQuizById } from '../controllers/quizController.js';

const router = express.Router();

router.route('/').get(getQuizzes);
router.route('/:id').get(getQuizById);

export default router;
