import express from "express";
import * as quizController from "../controllers/quizController";

//* ----- Definitions -----

const router = express.Router();


//* ----- User Routes -----

router.get("/", quizController.getRoute); //? Is this the best way to do this?
router.get("/random", quizController.getRandomRuns);
router.get("/random/:runs", quizController.getRandomRuns);
router.get('/check', quizController.getAnswer);


//* ----- Dev Routes -----

router.get("/reset", quizController.stateReset);
router.get("/state", quizController.stateShow);


//* ----- Exports -----

export default router;
