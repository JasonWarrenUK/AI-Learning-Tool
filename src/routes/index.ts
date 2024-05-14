import express from 'express';
import metaRoutes from "./metaRoutes";
import testRoutes from "./testRoutes";
import quizRoutes from "./quizRoutes";

const router = express.Router();

router.use('/', metaRoutes);
router.use('/test', testRoutes);
router.use('/quiz', quizRoutes);

export default router;