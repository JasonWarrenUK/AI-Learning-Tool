import express from 'express';
import * as metaController from '../controllers/metaController';

const router = express.Router();


//* ----- Meta Routes -----

router.get('/', metaController.index);
router.get('/debug', metaController.debug);


//* ----- Exports -----

export default router;