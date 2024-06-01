import quizData from "../repositories/questions.json";


//* ----- Interfaces -----

interface quizState {
    totalQuestions: number,
    highestIndex: number,
    questionsSeen: number[],
    currentIndex: number
}

interface runState {
    targetAnswers: number,
    userAnswers: number,
    userRight: number,
    userWrong: number
}


//* ----- State Trackers -----

export const state: quizState = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1,
    questionsSeen: [],
    currentIndex: 0
}

export const progress: runState = {
    targetAnswers: quizData.questions.length, //todo make this read the chosen length
    userAnswers: 0,
    userRight: 0,
    userWrong: 0
}