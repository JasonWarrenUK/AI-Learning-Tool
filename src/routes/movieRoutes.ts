import express from 'express';
import moviesController from '../controllers/moviesController';

const router = express.Router();

router.get('/', moviesController.getHello);

export default router;