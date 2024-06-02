import { Request, Response } from "express";
import quizData from "../repositories/questions.json";
import { randomInt } from "../utils/numbers";
import * as state from "../states/quiz";
import * as dev from "./cDev";


//* ----- Declarations -----


const started = state.session.started;
const finished = state.session.finished;
const active = state.session.midquestion;


//* ----- Page Builder -----

export function buildQuiz(req: Request, res: Response) {
  let display: string = ``;
  
  display += dev.modeOpts(req, res);
  if (state.dev.devMode) { display += dev.devOpts(req, res) };

  display += info(req, res);
  display += getRoute(req, res);
  display += info(req, res);

  res.send(display);
}


//* ----- Block Chooser -----

export function getRoute(req: Request, res: Response) {
  let display = ``;
  
  if (started && !active && finished) { 
    display += getResults(req, res);
  } else if (started && active && !finished) {
    display += getAnswer(req, res);
  } else if (started && !active && !finished) {
    display += getRandomRuns(req, res);
  } else if (!started && !active && !finished) {
    display += start(req, res);
  } else {
    display += error(req, res);
  }

  return display;
}


//* ----- Block Builder -----

export function getAnswer(req: Request, res: Response) {
  const answerUser = req.query.option as string;
  const answerCorrect = quizData.questions[state.source.currentIndex].answer;
  
  let display: string = ``;

  // todo Make this into a switch statement
  if (answerUser === undefined) {
    display += `You haven't submitted an answer`;
  } else if (answerUser === answerCorrect) {
    state.progress.userAnswers++;
    state.progress.userRight++;
    state.session.midquestion = false;
    display += `You said ${answerUser}...<br/>You're correct!`;
  } else {
    state.progress.userAnswers++;
    state.progress.userWrong++;
    state.session.midquestion = false;
    display += `You said ${answerUser}...<br/>Incorrect! The correct answer was ${answerCorrect}`;
  }

  return display;
}

export function getRandomRuns(req: Request, res: Response) {
  let display: string = ``;

  for (let runs = parseInt(req.params.runs) || 1; runs > 0; runs--) {
    display += question(req, res);
    runs--;
  }

  return display;
}

export function getResults(req: Request, res: Response) {
  let display: string = ``;

  display += `<p>Results</p>`

  return display;
}

//* ----- Content Builder -----

function error(req: Request, res: Response): string {
  return `<pre>Error</pre>`;
}

function info(req: Request, res: Response): string {
  let content = ``;

  content += `<hr/>`;
  content += `<pre>
    Remaining: ${state.source.totalQuestions - state.source.questionsSeen.length}
    Questions Seen: ${state.source.questionsSeen}
    Progress: You've answered ${state.progress.userAnswers} of ${state.progress.targetAnswers}
    You've got ${state.progress.userRight} correct & ${state.progress.userWrong} incorrect
  </pre>`;
  content += `<hr/>`;

  return content;
}

function question(req: Request, res: Response): string {
  const quizJSON = quizData;
  let qId: number = -1;
  let htmlResponse: string = "";
  state.session.midquestion = true;

  if (state.source.questionsSeen.length === state.source.highestIndex + 1) {
    htmlResponse += `<pre>Fuck you, no more questions</pre>`;
  } else {
    while (state.source.questionsSeen.includes(qId) || qId === -1) {
      qId = randomInt(0, state.source.highestIndex);
    }

    state.source.questionsSeen.push(qId);
    state.source.currentIndex = qId;
    const qChosen = quizJSON.questions[qId];

    htmlResponse += `<p>${qChosen.question}</p>`;

    htmlResponse += `<form action="/quiz/" method="get">`;
    qChosen.options.forEach((option) => {
      htmlResponse += `<input type="radio" id="${option}" name="option" value="${option}">              
      <label for="${option}">${option}</label><br/>`;
    });
    htmlResponse += `<button type="submit">Submit Answer</button>`;
    htmlResponse += `</form>`;
  }

  return htmlResponse;
}

function start(req: Request, res: Response): string {
  state.session.started = true;

  let htmlResponse: string = ``;
  htmlResponse += `LET'S GO!!!`;
  htmlResponse += getRandomRuns(req, res);

  return htmlResponse;
}

//todo function displayAnswer() {}
