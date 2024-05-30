import quizData from "../repositories/questions.json";


//* ----- Interfaces -----

interface quizSource {
    totalQuestions: number,
    highestIndex: number
}

interface quizState {
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

export const source: quizSource = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1
}

export const state: quizState = {
    questionsSeen: [],
    currentIndex: 0
}

export const progress: runState = {
    targetAnswers: 0, //todo make this read the quiz length
    userAnswers: 0,
    userRight: 0,
    userWrong: 0
}