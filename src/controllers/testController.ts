import { Request, Response, NextFunction } from 'express';
import quizData from '../repositories/questions';
// import { QuizContent } from '../interface';
import * as fs from 'fs';

// const quizJSON = __dirname + "/../repositories/questions.json";

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
		const questions = JSON.parse(data);
		const question = questions["questions"];
		res.end(JSON.stringify(question));
		// const question = data[];
	})
}