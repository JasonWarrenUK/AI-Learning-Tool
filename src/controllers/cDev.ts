import { Request, Response, NextFunction } from "express";
import * as quiz from "./cQuiz";
import * as quizState from "../states/quiz";
import * as appState from "../states/app";



//* ----- Dev Menus -----

export function devOpts(req: Request, res: Response): string {
  let htmlResponse: string = ``;
  htmlResponse += `<hr/>`;
  htmlResponse += `<ul>
    <li><a href="/dev/reset">Reset Quiz State</a></li>
    <li><a href="/dev/state">Console Log Quiz State</a></li>
  </ul>`;
  htmlResponse += `<hr/>`;
  return htmlResponse;
}

// todo: How to make a button that calls a function without calling a route?
export function modeOpts(req: Request, res: Response): string {
  appState.dev.devMode ? appState.dev.modeName = `Dev Mode` : appState.dev.modeName = `User Mode`;
  let htmlResponse: string = ``;

  htmlResponse += `<hr/>`;
  htmlResponse += `You're in ${appState.dev.modeName}`;
  htmlResponse += `<ul>
    <li><a href="/dev/toggle">Change Mode</a></li> 
  </ul>`;
  htmlResponse += `<hr/>`;
  
  return htmlResponse;
}

//* ----- Show Data -----

export function getAllQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (let i = 0; i <= quizState.source.highestIndex; i++) {
    quiz.getRandomRuns;
  }
}

export function stateShow(req: Request, res: Response, next: NextFunction) {
  console.group(`Quiz Info`);
    console.group(`Source Data`);
      console.log(`qAll: ${quizState.source.totalQuestions}`);
      console.log(`qMax index: ${quizState.source.highestIndex}`);
    console.groupEnd();
    console.group(`State`);
      console.log(`Current Question: ${quizState.source.currentIndex}`);
      console.group(`Questions Seen`);
        console.log(`Number Seen: ${quizState.source.questionsSeen.length}`);
        console.log(`Array: [${quizState.source.questionsSeen}]`);
      console.groupEnd();
    console.groupEnd();
  console.groupEnd();

  res.send();
}

//* ----- Edit Data -----

export function stateReset(req: Request, res: Response, next: NextFunction) {
  console.group(`Reset State`);
  console.log(`qSeen length: ${quizState.source.questionsSeen.length}`);

  while (quizState.source.questionsSeen.length > 0) {
    quizState.source.questionsSeen.pop;
  }

  console.log(`qSeen length: ${quizState.source.questionsSeen.length}`);
  console.groupEnd();

  res.send();
}

// todo: How do I make this do the thing then stop?
export function toggleMode(req: Request, res: Response, next: NextFunction) {
  appState.dev.devMode ? appState.dev.devMode = false : appState.dev.devMode = true;
  res.send();
}

//* ----- Mode Toggle -----
