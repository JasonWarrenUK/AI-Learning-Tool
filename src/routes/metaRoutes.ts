import express from 'express';
import * as metaController from '../controllers/metaController';

const router = express.Router();

router.get('/', metaController.index);
router.get('/debug', metaController.debug);

export default router;