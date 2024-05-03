import express from 'express';
import movieRoutes from "./movieRoutes";
import quizRoutes from "./quizRoutes";

const router = express.Router();

router.use('/', quizRoutes);
router.use('/api/v1/movies', movieRoutes);
router.use('/api/v1/quiz', quizRoutes);

export default router;