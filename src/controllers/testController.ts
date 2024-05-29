import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { getRandom } from "./quizController";
import * as quiz from "../states/quiz";
import * as fs from "fs";

export function getAllQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (let i = 0; i <= quiz.source.highestIndex; i++) {
    getRandom;
  }
}
