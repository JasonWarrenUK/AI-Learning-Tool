import express from 'express';
import meta from "./rMeta";
import dev from "./rDev";
import quiz from "./rQuiz";

const router = express.Router();

router.use('/', meta);
router.use('/quiz', quiz);
router.use('/dev', dev);

export default router;