import { Request, Response, NextFunction } from 'express';
import quizData from '../repositories/questions';
import { QuizContent } from '../interface';
import * as fs from 'fs';

function getList(req: Request, res: Response, next: NextFunction) {
	fs.readFile( __dirname + "/../repositories/questions.json", 'utf8', function (err, data) {
		res.end( data );
 });
}

function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a quiz');
}

function getData(req: Request, res: Response, next: NextFunction) {
	let questions = quizData;

	res.json({
		"status": 200,
		"statusText": "OK",
		"message": "Here's the questions",
		"data": questions
	});
}

export default { getData, getHello, getList };