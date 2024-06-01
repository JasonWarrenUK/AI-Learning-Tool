import quizData from "../repositories/questions.json";
import {quizState, runState, sessionState} from "../interface";


//* ----- State Trackers -----

export const state: quizState = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1,
    questionsSeen: [],
    currentIndex: 0
}

export const progress: runState = {
    targetAnswers: quizData.questions.length, //todo read run length
    userAnswers: 0,
    userRight: 0,
    userWrong: 0
}

export const session: sessionState = {
    started: false,
    finished: false
}