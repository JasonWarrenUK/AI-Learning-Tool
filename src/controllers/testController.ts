import { Request, Response, NextFunction } from "express";
import { getRandom } from "./quizController";
import * as quiz from "../states/quiz";

/* export function getList(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf8', function (err, data) {
		res.end( data );
 });
} */

/* export function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a quiz');
} */

/* export function getData(req: Request, res: Response, next: NextFunction) {
	let questions = quizData;

	res.json({
		"status": 200,
		"statusText": "OK",
		"message": "Here's the questions",
		"data": questions
	});
} */

/* export function getQuestionById(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf-8', function (err, data) {
		const id = parseInt(req.params.id);
		const questionText = JSON.parse(data)["questions"][id-1]["question"];
		res.end(JSON.stringify(questionText));
	})
} */

export function getAllQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (let i = 0; i <= quiz.source.highestIndex; i++) {
    getRandom;
  }
}
