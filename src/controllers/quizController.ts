import { Request, Response, NextFunction } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import * as quiz from "../states/quiz";


//* ----- Dev Functions -----

export function stateShow(req: Request, res: Response, next: NextFunction) {
  console.group(`Quiz Info`);
    console.group(`Source Data`);
      console.log(`qAll: ${quiz.state.totalQuestions}`);
      console.log(`qMax index: ${quiz.state.highestIndex}`);
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


//* ----- Page Builder ----- 

export function getRoute(req: Request, res: Response) {
  let display: string = ``;
  display += info(req, res);

  //todo Route goes here
  
  display += info(req, res);

  res.send(display);
}


//* ----- Block Builder -----

// export function getRandom(req: Request, res: Response, next: NextFunction) {
//   let display: string = '';
//   display += displayQuestion(req, res, next);
//   res.send(display);
// }

export function getRandomRuns(req: Request, res: Response, next: NextFunction) {
  let display: string = ``;
  for (let runs = parseInt(req.params.runs) || 1; runs > 0; runs--) {
    display += question(req, res, next);
    runs--;
  }

  res.send(display);
}

export function getAnswer(req: Request, res: Response) {
  let display: string = ``;

  const answerUser = req.query.option as string;
  const answerCorrect = quizData.questions[quiz.state.currentIndex].answer;

  quiz.progress.userAnswers++;

  // todo Make this into a switch statement
  if (answerUser === undefined) {
    display += `You haven't submitted an answer`;
    quiz.progress.userAnswers--;
  } else if (answerUser === answerCorrect) {
    display += `
      You said ${answerUser}...
      <br/>
      You're correct!
    `;
    quiz.progress.userRight++;
  } else {
    display += `
      You said ${answerUser}...
      <br/>
      Incorrect! The correct answer was ${answerCorrect}
    `;
    quiz.progress.userWrong++;
  }

  display += `<br/>`
  display += `<p><a href="/quiz/random/1">Get a New Question</a></p>`

  res.send(display);
}

//* ----- Content Builder -----

function info(req: Request, res: Response) {
  let content = ``;
  content += `<hr/>`;
  content += `<pre>Remaining: ${quiz.state.totalQuestions - quiz.state.questionsSeen.length}</pre>`;
  content += `<pre>Questions Seen: ${quiz.state.questionsSeen}</pre>`;
  content += `<pre>Progress: You've answered ${quiz.progress.userAnswers} of ${quiz.progress.targetAnswers}</pre>`;
  content += `<pre>You've got ${quiz.progress.userRight} correct & ${quiz.progress.userWrong} incorrect</pre>`;
  content += `<hr/>`;

  return content;
}

function question(req: Request, res: Response, next: NextFunction) {
  const quizJSON = quizData;
  let qId: number = -1;
  let htmlResponse: string = "";

  if (quiz.state.questionsSeen.length === quiz.state.highestIndex + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (quiz.state.questionsSeen.includes(qId) || qId === -1) {
      qId = randomInt(0, quiz.state.highestIndex);
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

//todo function displayAnswer() {}
