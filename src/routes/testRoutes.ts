import express from 'express';
import * as testController from '../controllers/testController';

const router = express.Router();

// router.get('/json', testController.getList);
// router.get('/hello', testController.getHello);
// router.get('/data', testController.getData);
// router.get('/:id', testController.getQuestionById);
router.get('/runAll', testController.getAllQuestions);

export default router;