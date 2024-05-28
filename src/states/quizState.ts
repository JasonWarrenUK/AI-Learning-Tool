import quizData from "../repositories/questions.json";

export const qAll: number = quizData.questions.length;
export const qMax: number = qAll - 1;
export const qSeen: number[] = [];