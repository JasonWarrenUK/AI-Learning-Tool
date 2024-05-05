import { Request, Response, NextFunction } from 'express';
import { QuizSession, QuizContent, UserQuizState } from '../interface';
import { v4 as uuidv4 } from 'uuid';
import quizData from '../repositories/questions';
import { initializeQuizState, selectRandomQuestion, getCurrentQuestion, processAnswer } from '../utils/quizManager';

function startQuiz(req: Request, res: Response) {
  const sessionId = uuidv4();
  let quizContent: QuizContent = { ...quizData };  // Deep copy to manage state locally
  let userQuizState: UserQuizState = initializeQuizState(quizContent);
  
  // Save session state in a store (could be a simple in-memory store or a database)
  sessionStorage[sessionId] = { userQuizState, sessionId };

  selectRandomQuestion(sessionId);
  res.redirect(`/quiz/${sessionId}`);  // Direct user to the quiz page with the session ID
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

/* function getQuiz(req: Request, res: Response, next: NextFunction) {
	let quizContent: QuizContent = quizData as QuizContent;
	let firstQuestion = quizContent.quiz.questions[0];
  let htmlResponse = `<h1>${firstQuestion.question}</h1>`;

  htmlResponse += `<form action="/answer" method="post">`;
  
	firstQuestion.options.forEach(option => {
    htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                     <label for="${option}">${option}</label><br>`;
  });

  htmlResponse += `<input type="submit" value="Submit"></form>`;

  res.send(htmlResponse);
} */

function getQuiz(req: Request, res: Response) {
  const sessionId = req.params.sessionId;
  const session: QuizSession = sessionStorage[sessionId];
  if (!session) {
    return res.status(404).send("Session not found.");
  }

  const question = getCurrentQuestion(session.userQuizState);

  if (!question) {
    return showResults(res, session.userQuizState);
  }

  renderQuestion(res, question);
}

function renderQuestion(res: Response, question) {
  let htmlResponse = `<h1>${question.question}</h1><form action="/answer" method="post">`;

  question.options.forEach(option => {
    if (!question.attemptedAnswers.has(option)) {  // Check if the option hasn't been attempted
      htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                       <label for="${option}">${option}</label><br>`;
    }
  });

  htmlResponse += `<input type="submit" value="Submit"></form>`;
  res.send(htmlResponse);
}

/* function answer(req: Request, res: Response) {
	let quizContent: QuizContent = quizData as QuizContent;
  const userAnswer = req.body.option;
  const correctAnswer = quizContent.quiz.questions[0].answer;

  if (userAnswer === correctAnswer) {
    res.send("Correct!");
  } else {
    res.send("Incorrect! The correct answer was " + correctAnswer);
  }
}; */

function answer(req: Request, res: Response) {
  const sessionId = req.params.sessionId;
  const session: QuizSession = sessionStorage[sessionId];
  if (!session) {
    return res.status(404).send("Session not found.");
  }

  const { option } = req.body;
  processAnswer(session.userQuizState, option);

  if (session.userQuizState.completedQuestions >= 10) {
    return showResults(res, session.userQuizState);
  }

  getQuiz(req, res);  // Redirect back to getQuiz to handle next steps
}

function showResults(res: Response, userQuizState: UserQuizState) {
  const totalAttempts = userQuizState.results.reduce((acc, curr) => acc + curr.attempts, 0);
  const averageAttempts = totalAttempts / userQuizState.results.length;

  res.render('results', {  // Assuming you have a view named 'results'
    results: userQuizState.results,
    averageAttempts: averageAttempts.toFixed(2)
  });
}

export default {
	getHello, getData, getQuiz,
	answer
};