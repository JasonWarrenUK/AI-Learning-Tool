import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import * as quiz from "../states/quiz";

/* Dev Functions */

export function stateShow(req: Request, res: Response, next: NextFunction) {
  console.group(`Quiz Info`);
    console.group(`Source Data`);
      console.log(`qAll: ${quiz.source.totalQuestions}`);
      console.log(`qMax index: ${quiz.source.highestIndex}`);
    console.groupEnd();
    console.group(`State`);
      console.log(`Current Question: ${quiz.state.currentIndex}`);
      console.group(`Questions Seen`);
        console.log(`Number Seen: ${quiz.state.questionsSeen.length}`);
        console.log(`Array: [${quiz.state.questionsSeen}]`);
      console.groupEnd();
    console.groupEnd();
  console.groupEnd();

  res.send();
}

export function stateReset(req: Request, res: Response, next: NextFunction) {
  console.group(`Reset State`);
  console.log(`qSeen length: ${quiz.state.questionsSeen.length}`);

  while (quiz.state.questionsSeen.length > 0) {
    quiz.state.questionsSeen.pop;
  }

  console.log(`qSeen length: ${quiz.state.questionsSeen.length}`);
  console.groupEnd();

  res.send();
}


/* Quiz Functions */

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
  const quizJSON = quizData;
  let qId: number = -1;
  let htmlResponse: string = "";

  htmlResponse += `<pre>Remaining: ${quiz.source.totalQuestions - quiz.state.questionsSeen.length}</pre>`;
  htmlResponse += `<pre>Questions Seen: ${quiz.state.questionsSeen}</pre>`;

  if (quiz.state.questionsSeen.length === quiz.source.highestIndex + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (quiz.state.questionsSeen.includes(qId) || qId === -1) {
      qId = randomInt(0, quiz.source.highestIndex);
    }

    quiz.state.questionsSeen.push(qId);
    quiz.state.currentIndex = qId;
    const qChosen = quizJSON.questions[qId];

    htmlResponse += `<h1>${qChosen.question}</h1>`;
    htmlResponse += `<form action="/answer" method="post">`;
    qChosen.options.forEach((option) => {
      htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">
                      <label for="${option}">${option}</label>`;
    });
    htmlResponse += `</form>`;
  }

  htmlResponse += `<pre>Remaining: ${quiz.source.totalQuestions - quiz.state.questionsSeen.length}</pre>`;
  htmlResponse += `<pre>Questions Seen: ${quiz.state.questionsSeen}</pre>`;

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

export function answer(req: Request, res: Response) {
  const answerUser = req.body.option;
  const answerCorrect = quizData.questions[quiz.state.currentIndex].answer;
  
  console.log(`You said: ${answerUser}`);
  console.log(`Quiz said: ${answerCorrect}`);

  if (answerUser === undefined) {
    res.send(`You haven't submitted an answer`);
  } else if (answerUser === answerCorrect) {
    res.send(`Correct!`);
  } else {
    res.send(`Incorrect! The correct answer was ${answerCorrect}`);
  }
}
