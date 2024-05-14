import { Request, Response, NextFunction } from 'express';
import quizData from '../repositories/questions';
import { randomInt } from '../utils/numbers';
// import { QuizContent } from '../interface';
import * as fs from 'fs';

let questionsSeen = [];
const questionsAll = 30;

export function getList(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf8', function (err, data) {
		res.end( data );
 });
}

export function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a quiz');
}

export function getData(req: Request, res: Response, next: NextFunction) {
	let questions = quizData;

	res.json({
		"status": 200,
		"statusText": "OK",
		"message": "Here's the questions",
		"data": questions
	});
}

export function getQuestionById(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf-8', function (err, data) {
		const id = parseInt(req.params.id);
		const questionText = JSON.parse(data)["questions"][id-1]["question"];
		res.end(JSON.stringify(questionText));
	})
}

export function getRandomQuestion(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf-8', function (err, data) {
		const id = randomInt(1, questionsAll);
		const questionText = JSON.parse(data)["questions"][id-1]["question"];

		questionsSeen.push(id);

		res.end(`
			<p>${JSON.stringify(questionText)}</p>
			<br/>
			<p>You have ${questionsAll - questionsSeen.length} unseen questions</p>
		`);
	})
}