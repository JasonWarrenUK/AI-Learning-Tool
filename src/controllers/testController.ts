import { Request, Response, NextFunction } from "express";
import * as controller from "./quizController";
import * as quiz from "../states/quiz";

export function getAllQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (let i = 0; i <= quiz.state.highestIndex; i++) {
    controller.getRandomRuns;
  }
}
