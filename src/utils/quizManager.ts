import { QuizContent, UserQuizState } from '../interface';
import { shuffleArray } from './helpers'; // Assuming you have or will implement a utility to shuffle arrays

export function initializeQuizState(quizContent: QuizContent): UserQuizState {
  const questions = quizContent.quiz.questions.map(question => ({
    ...question,
    asked: false,
    attempts: 0,
    attemptedAnswers: new Set<string>()
  }));

  shuffleArray(questions); // Randomizes the order of questions

  return {
    questions,
    currentQuestionIndex: null,
    completedQuestions: 0,
    results: []
  };
}

export function getCurrentQuestion(userQuizState: UserQuizState) {
  if (userQuizState.currentQuestionIndex === null || userQuizState.currentQuestionIndex >= userQuizState.questions.length) {
    const nextQuestionIndex = userQuizState.questions.findIndex(q => !q.asked);
    if (nextQuestionIndex !== -1) {
      userQuizState.currentQuestionIndex = nextQuestionIndex;
      userQuizState.questions[nextQuestionIndex].asked = true;
      return userQuizState.questions[nextQuestionIndex];
    }
    return null;  // No more questions available
  }
  return userQuizState.questions[userQuizState.currentQuestionIndex];
}

export function processAnswer(userQuizState: UserQuizState, userAnswer: string) {
  const currentQuestion = userQuizState.questions[userQuizState.currentQuestionIndex];
  
  if (currentQuestion.answer === userAnswer) {
    userQuizState.completedQuestions++;
    userQuizState.results.push({
      question: currentQuestion.question,
      userAnswers: Array.from(currentQuestion.attemptedAnswers).concat(userAnswer),
      attempts: currentQuestion.attempts + 1
    });
    userQuizState.currentQuestionIndex = null; // Reset for new question
  } else {
    currentQuestion.attemptedAnswers.add(userAnswer);
    currentQuestion.attempts++;
    if (currentQuestion.attempts >= 3) {
      userQuizState.currentQuestionIndex = null; // Reset for new question if 3 attempts are reached
    }
  }
}