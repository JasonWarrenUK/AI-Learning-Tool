import express from 'express';
import testRoutes from "./testRoutes";
import quizRoutes from "./quizRoutes";

const router = express.Router();

router.use('/test', testRoutes);
router.use('/', quizRoutes);

export default router;