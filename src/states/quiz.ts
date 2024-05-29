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


//* ----- State Trackers -----

export const source: quizSource = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1
}

export const state: quizState = {
    questionsSeen: [],
    currentIndex: 0
}