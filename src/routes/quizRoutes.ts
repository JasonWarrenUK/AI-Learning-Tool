import express from 'express';
import quizController from '../controllers/quizController';

const router = express.Router();

router.get('/', quizController.getQuiz);
// router.post('/answer', quizController.answer);

export default router;