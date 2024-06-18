import quizData from "../repositories/questions.json";
import {_source, _progress, _session} from "../interface";


//* ----- State Trackers -----

export const source: _source = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1,
    questionsSeen: [],
    currentIndex: 0
}

export const progress: _progress = {
    targetAnswers: quizData.questions.length, //todo read run length
    userAnswers: 0,
    userRight: 0,
    userWrong: 0
}

export const session: _session = {
    started: false,
    finished: false,
    midquestion: false
}