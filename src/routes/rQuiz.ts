import express from "express";
import * as quiz from "../controllers/cQuiz";

const router = express.Router();

router.get("/", quiz.buildQuiz); //? Is this the best way to do this?
router.get("/random", quiz.getRandomRuns);
router.get("/random/:runs", quiz.getRandomRuns);
router.get("/check", quiz.getAnswer);

router.post("/", quiz.setLength);

export default router;
