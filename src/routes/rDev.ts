import express from "express";
import * as dev from "../controllers/cDev";

const router = express.Router();

router.get("/runAll", dev.getAllQuestions);
router.get("/reset", dev.stateReset);
router.get("/state", dev.stateShow);
router.get("/toggle", dev.toggleMode);

export default router;
