import { Request, Response, NextFunction } from 'express';
import quizContent from '../repositories/sample';

function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a quiz');
}

function getQuiz(req: Request, res: Response, next: NextFunction) {
	let questions = quizContent;

	res.json({
		"status": 200,
		"statusText": "OK",
		"message": "Here's the questions",
		"data": questions
	});
}

export default { getHello, getQuiz };