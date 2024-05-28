import express from "express";
import * as quizController from "../controllers/quizController";

const router = express.Router();

router.get("/reset", quizController.stateReset);
router.get("/state", quizController.stateShow);


router.get("/default", quizController.getDefault);
router.get("/random/:runs", quizController.getRandomRuns);
router.post('/answer', quizController.answer);

export default router;
