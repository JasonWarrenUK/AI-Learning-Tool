import express from 'express';
import quizController from '../controllers/quizController';

const router = express.Router();

router.get('/', quizController.getHello);
router.get('/quiz', quizController.getQuiz);

export default router;