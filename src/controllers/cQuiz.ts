//h1 Setup
//h2 Imports
import { Request, Response } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import * as quizState from "../states/quiz";
import * as appState from "../states/app"
import * as dev from "./cDev";

//h2 Declarations

//h1 Page Builder
export function buildQuiz(req: Request, res: Response) {
  let display: string = dev.modeOpts(req, res);

  if (appState.dev.devMode) {
    display += dev.devOpts(req, res);
  };

  display += info(req, res);
  display += getRoute(req, res);
  display += info(req, res);

  res.send(display);
}

export function getRoute(req: Request, res: Response) {
  let started: boolean = quizState.session.started;
  let active: boolean = quizState.session.midquestion;
  let finished: boolean = quizState.session.finished;

  let display = ``;

  console.group(`Running getRoute()`);

  console.table([
    {flag: `Started`, state: `${started}`},
    {flag: `Active`, state: `${active}`},
    {flag: `Finished`, state: `${finished}`},
  ]);

  if (started && !active && finished) { 
    console.log(`Calling getResults()`);
    display += getResults(req, res);
  } else if (started && active && !finished) {
    console.log(`Calling getAnswer()`);
    display += getAnswer(req, res);
  } else if (started && !active && !finished) {
    console.log(`Calling getRandomRuns()`);
    display += getRandomRuns(req, res);
  } else if (!started && !active && !finished) {
    console.log(`Calling start()`);
    display += start(req, res);
  } else {
    console.log(`Calling error()`);
    display += error(req, res);
  }

  console.groupEnd();

  return display;
}

export function setLength(req: Request, res: Response) {
  quizState.progress.targetAnswers = req.body.quizLength;
  console.log(`Quiz Length: ${quizState.progress.targetAnswers}`);
}


//h1 Assemblers

export function getRandomRuns(req: Request, res: Response) {
  let display: string = ``;

  for (let runs = parseInt(req.params.runs) || 1; runs > 0; runs--) {
    display += questionBlock(req, res);
    runs--;
  }

  return display;
}

export function getAnswer(req: Request, res: Response) {
  const answerUser = req.query.option as string;
  const answerCorrect = quizData.questions[quizState.source.currentIndex].answer;
  
  let display: string = ``;

  // todo Make this into a switch statement
  if (answerUser === undefined) {
    display += `You haven't submitted an answer`;
  } else if (answerUser === answerCorrect) {
    quizState.progress.userAnswers++;
    quizState.progress.userRight++;
    quizState.session.midquestion = false;
    display += `You said ${answerUser}...<br/>You're correct!`;
  } else {
    quizState.progress.userAnswers++;
    quizState.progress.userWrong++;
    quizState.session.midquestion = false;
    display += `You said ${answerUser}...<br/>Incorrect! The correct answer was ${answerCorrect}`;
  }

  display += `<p><a href="/quiz/">Next Question</a></p>`

  return display;
}

export function getResults(req: Request, res: Response) {
  let display: string = ``;

  display += `<p>Results</p>`;

  return display;
}


//h1 Exported Content Blocks
export function error(req: Request, res: Response): string {
  return `<pre>Error</pre>`;
}

export function info(req: Request, res: Response): string {
  let content = ``;

  content += `<hr/>`;
  content += `<pre>
    Remaining: ${quizState.source.totalQuestions - quizState.source.questionsSeen.length}
    Questions IDs Seen: ${quizState.source.questionsSeen}
    Progress: You've answered ${quizState.progress.userAnswers} of ${quizState.progress.targetAnswers}
    You've got ${quizState.progress.userRight} correct & ${quizState.progress.userWrong} incorrect
  </pre>`;
  content += `<hr/>`;

  return content;
}

//h1 Non-Exported Content Blocks
function start(req: Request, res: Response): string {
  quizState.session.started = true;

  let htmlResponse: string = `LET'S GO!!!`;
  htmlResponse += `<form action="/quiz/" method="POST">
    <p>How many questions would you like to answer?</p>
    <label for="quizLength">Questions</label>
    <input type="number" id="quizLength" name="quizLength" min="1" max="30" required>
    <button type="submit">Submit</button>
  </form>`;

  return htmlResponse;
}

//h2 Display Question
function questionBlock(req: Request, res: Response): string {
  const qDoneArr: number[] = quizState.source.questionsSeen;
  const qDone: number = quizState.source.questionsSeen.length;
  const qAll: number = quizState.progress.targetAnswers;

  quizState.session.midquestion = true;

  let display: string = ``;

  display += `<hr/>`;
  display += qDone >= qAll ? endQuiz() : displayQuestion(qAll, qDoneArr);
  display += `<hr/>`;

  return display
}

function displayQuestion(qAll, qDoneArr): string {
  const quizJSON = quizData;
  let qId: number = -1;
  let htmlResponse: string = ``;

  while (qDoneArr.includes(qId) || qId === -1) {
    qId = randomInt(0, qAll - 1)
  };

  qDoneArr.push(qId);
  quizState.source.currentIndex = qId;
  const qChosen = quizJSON.questions[qId];

  htmlResponse += `<p>${qChosen.question}</p>`;
  htmlResponse += `<form action="/quiz/" method = "get" >`;
  htmlResponse += createAnswers(qChosen);
  htmlResponse += `<button type="submit">Submit Answer</button>`;
  htmlResponse += `</form>`;

  return htmlResponse;
}

function endQuiz(): string {
  return `<pre>Fuck you, no more questions</pre>`;
}

function createAnswers(qChosen): string {
  let htmlResponse = ``;

  qChosen.options.forEach(
    (option) => {
      htmlResponse += `
        <input type="radio" id="${option}" name="option" value="${option}">              
        <label for="${option}">${option}</label><br/>
      `;
    }
  );

  return htmlResponse;
}

//todo function displayAnswer() {}