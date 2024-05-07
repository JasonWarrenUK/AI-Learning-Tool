import express from 'express';
import testController from '../controllers/testController';

const router = express.Router();

router.get('/', testController.getList);
router.get('/hello', testController.getHello);
router.get('/data', testController.getData);

export default router;