import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import { qAll, qMax, qSeen } from "../states/quizState";

/* Quiz Functions */

export function stateShow(req: Request, res: Response, next: NextFunction) {
  console.group(`Show State`);
    console.log(`qAll: ${qAll}`);
    console.log(`qMax index: ${qMax}`);
    console.log(`qSeen length: ${qSeen.length}`);
    console.log(`qSeen array: ${qSeen}`);
  console.groupEnd();

  res.send();
}

export function stateReset(req: Request, res: Response, next: NextFunction) {
  console.group(`Reset State`);
    console.log(`qSeen length: ${qSeen.length}`);

    while (qSeen.length > 0) {
      qSeen.pop;
    }
    
    console.log(`qSeen length: ${qSeen.length}`);
  console.groupEnd();

  res.send();
}

export function getDefault(req: Request, res: Response, next: NextFunction) {
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

export function getRandom(req: Request, res: Response, next: NextFunction) {
  const quiz = quizData;
  let qId: number = -1;
  let htmlResponse: string = "";

  htmlResponse += `<pre>Remaining: ${qAll - qSeen.length}</pre>`;
  htmlResponse += `<pre>Questions Seen: ${qSeen}</pre>`;

  if (qSeen.length === qMax + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (qSeen.includes(qId) || qId === -1) {
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
    htmlResponse += `</form>`
  }

  htmlResponse += `<pre>Remaining: ${qAll - qSeen.length}</pre>`;
  htmlResponse += `<pre>Questions Seen: ${qSeen}</pre>`;

  return htmlResponse;
}

export function getRandomRuns(req: Request, res: Response, next: NextFunction) {
  let runs = parseInt(req.params.runs);
  
  let display: string = "";
  while (runs > 0) {
    display += getRandom(req, res, next);
    runs--;
  }

  res.send(display);
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
