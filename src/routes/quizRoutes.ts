import express from "express";
import quizController from "../controllers/quizController";

const router = express.Router();

router.get("/default", quizController.getDefault);
router.get("/random", quizController.getRandom);
// router.post('/answer', quizController.answer);

export default router;
