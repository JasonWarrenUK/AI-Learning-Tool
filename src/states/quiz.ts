import quizData from "../repositories/questions.json";

interface quizSource {
    totalQuestions: number,
    highestIndex: number
}

export const source: quizSource = {
    totalQuestions: quizData.questions.length,
    highestIndex: quizData.questions.length - 1
}

interface quizState {
    questionsSeen: number[],
    currentQuestion: number
}

export const state: quizState = {
    questionsSeen: [],
    currentQuestion: 0
}