import express from 'express';
import quizController from '../controllers/quizController';

const router = express.Router();

router.get('/', quizController.getQuiz);
router.get('/list', quizController.getList);
router.get('/awake', quizController.getHello);
router.get('/object', quizController.getData);

// router.post('/answer', quizController.answer);

export default router;