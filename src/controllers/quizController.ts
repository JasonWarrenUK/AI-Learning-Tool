import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import * as quiz from "../states/quiz";


//* ----- Dev Functions -----

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


//* ----- Questions & Answers -----

// export function getRandom(req: Request, res: Response, next: NextFunction) {
//   let display: string = '';
//   display += displayQuestion(req, res, next);
//   res.send(display);
// }

export function getRandomRuns(req: Request, res: Response, next: NextFunction) {
  let display: string = info(req, res, next);
  for (let runs = parseInt(req.params.runs) || 1; runs > 0; runs--) {
    display += displayQuestion(req, res, next);
    runs--;
  }
  display += info(req, res, next);

  res.send(display);
}

export function answer(req: Request, res: Response) {
  console.log(req.query);

  const answerUser = req.query.option as string;
  const answerCorrect = quizData.questions[quiz.state.currentIndex].answer;
  
  console.log(`You said: ${answerUser}`);
  console.log(`Quiz said: ${answerCorrect}`);

  let htmlResponse: string = "";

  if (answerUser === undefined) {
    htmlResponse += `You haven't submitted an answer`;
  } else if (answerUser === answerCorrect) {
    htmlResponse += `
      You said ${answerUser}...
      <br/>
      You're correct!
    `;
  } else {
    htmlResponse += `
      You said ${answerUser}...
      <br/>
      Incorrect! The correct answer was ${answerCorrect}
    `;
  }

  htmlResponse += `<br/>`
  htmlResponse += `<p><a href="/quiz/random/1">Get a New Question</a></p>`

  res.send(htmlResponse);
}


//* ----- Content Creation -----

function info(req: Request, res: Response, next: NextFunction) {
  let content = ``;
  content += `<hr/>`;
  content += `<pre>Remaining: ${quiz.source.totalQuestions - quiz.state.questionsSeen.length}</pre>`;
  content += `<pre>Questions Seen: ${quiz.state.questionsSeen}</pre>`;
  content += `<pre>Progress: You've answered ${quiz.progress.userAnswers} of ${quiz.progress.targetAnswers}</pre>`;
  content += `<pre>You've got ${quiz.progress.userRight} correct & ${quiz.progress.userWrong} incorrect</pre>`;
  content += `<hr/>`;

  return content;
}

function footer(req: Request, res: Response, next: NextFunction) {
  let content = ``;
  content += `<hr/>`;
  content += `<pre>Remaining: ${quiz.source.totalQuestions - quiz.state.questionsSeen.length}</pre>`;
  content += `<pre>Questions Seen: ${quiz.state.questionsSeen}</pre>`;
  content += `<hr/>`;

  return content;
}

function displayQuestion(req: Request, res: Response, next: NextFunction) {
  const quizJSON = quizData;
  let qId: number = -1;
  let htmlResponse: string = "";

  if (quiz.state.questionsSeen.length === quiz.source.highestIndex + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (quiz.state.questionsSeen.includes(qId) || qId === -1) {
      qId = randomInt(0, quiz.source.highestIndex);
    }

    quiz.state.questionsSeen.push(qId);
    quiz.state.currentIndex = qId;
    const qChosen = quizJSON.questions[qId];

    htmlResponse += `<p>${qChosen.question}</p>`;

    htmlResponse += `<form action="/quiz/check" method="get">`;
    qChosen.options.forEach((option) => {
      htmlResponse += `
        <input type="radio" id="${option}" name="option" value="${option}">              
        <label for="${option}">${option}</label>
        <br/>
      `;
    });
    htmlResponse += `<button type="submit">Submit Answer</button>`;
    htmlResponse += `</form>`;
  }

  return htmlResponse;
}
