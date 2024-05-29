import express from "express";
import * as quizController from "../controllers/quizController";

const router = express.Router();


//* ----- Dev Routes -----

router.get("/reset", quizController.stateReset);
router.get("/state", quizController.stateShow);


//* ----- User Routes -----

router.get("/random", quizController.getRandom);
router.get("/random/:runs", quizController.getRandomRuns);
router.get('/check', quizController.answer);


//* ----- Exports -----

export default router;
