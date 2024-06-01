import express from 'express';
import metaRoutes from "./metaRoutes";
import testRoutes from "./testRoutes";
import quizRoutes from "./quizRoutes";

const router = express.Router();


//* ----- Routes -----

router.use('/', metaRoutes);
router.use('/quiz', quizRoutes);
router.use('/test', testRoutes);


//* ----- Exports -----

export default router;