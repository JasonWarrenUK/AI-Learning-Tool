import express from 'express';
import * as meta from '../controllers/cMeta';

const router = express.Router();

router.get('/', meta.index);

export default router;