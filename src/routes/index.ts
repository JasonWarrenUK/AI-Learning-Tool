import express from 'express';
import movieRoutes from "./movieRoutes";

const router = express.Router();

router.use('/api/v1/movies', movieRoutes);

export default router;