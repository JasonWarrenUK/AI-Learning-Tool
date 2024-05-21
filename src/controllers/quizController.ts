import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import { qSeen } from "../states/quizState";

/* Quiz Functions */

function getDefault(req: Request, res: Response, next: NextFunction) {
  const quizContent = quizData;
  const firstQuestion = quizContent.questions[0];

  let htmlResponse = `<h1>${firstQuestion.question}</h1>`;
  htmlResponse += `<form action="/answer" method="post">`;
  firstQuestion.options.forEach((option) => {
    htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                     <label for="${option}">${option}</label><br>`;
  });
  htmlResponse += `<input type="submit" value="Submit"></form>`;

  res.send(htmlResponse);
}

function getRandom(req: Request, res: Response, next: NextFunction) {
  const quiz = quizData;
  const qMax = quiz.questions.length - 1;
  let qId: number = -1;
  let htmlResponse: string = "";

  htmlResponse += `<pre>Seen: ${qSeen}</pre>`;

  if (qSeen.length == qMax + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (qSeen.includes(qId) || qId == -1) {
      qId = randomInt(0, qMax);
    }

    qSeen.push(qId);
    const qChosen = quiz.questions[qId];

    htmlResponse += `<h1>${qChosen.question}</h1>`;
    htmlResponse += `<form action="/answer" method="post">`;
    qChosen.options.forEach((option) => {
      htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                      <label for="${option}">${option}</label>`;
    });
    htmlResponse += `<input type="submit" value="Submit"></form>`;
    htmlResponse += `<pre>Seen: ${qSeen}</pre>`;
  }

  res.send(htmlResponse);
}

/*
function answer (req: Request, res: Response) {
  const userAnswer = req.body.option;
  const correctAnswer = quizContent.quiz.questions[0].answer;

  if (userAnswer === correctAnswer) {
    res.send("Correct!");
  } else {
    res.send("Incorrect! The correct answer was " + correctAnswer);
  }
};
*/

export default { /* answer, */ getDefault, getRandom };
