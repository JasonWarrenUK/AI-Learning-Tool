import { Request, Response, NextFunction } from 'express';
import quizData from '../repositories/questions';
import { QuizContent } from '../interface';

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

function getQuiz(req: Request, res: Response, next: NextFunction) {
	let quizContent: QuizContent = quizData as QuizContent;
	let firstQuestion = quizContent.quiz.questions[0];
  let htmlResponse = `<h1>${firstQuestion.question}</h1>`;

  // Adding a form for the options
  htmlResponse += `<form action="/answer" method="post">`;
  
	firstQuestion.options.forEach(option => {
    htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                     <label for="${option}">${option}</label><br>`;
  });

  htmlResponse += `<input type="submit" value="Submit"></form>`;

  res.send(htmlResponse);
}

function answer(req: Request, res: Response) {
	let quizContent: QuizContent = quizData as QuizContent;
  const userAnswer = req.body.option;
  const correctAnswer = quizContent.quiz.questions[0].answer;

  if (userAnswer === correctAnswer) {
    res.send("Correct!");
  } else {
    res.send("Incorrect! The correct answer was " + correctAnswer);
  }
};

export default {
	getHello, getData, getQuiz,
	answer
};