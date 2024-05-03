import { Request, Response, NextFunction } from 'express';
import quizContent from '../material/sample';

function getHello(req: Request, res: Response, next: NextFunction) {
  res.send('Help, I am trapped three folders deep in a quiz');
}

function getQuiz(req: Request, res: Response, next: NextFunction) {
	res.status(206).json(quizContent);
	// could also .send(quizContent);
}

export default { getHello, getQuiz };