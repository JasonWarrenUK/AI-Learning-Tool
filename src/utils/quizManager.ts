import { QuizContent, QuizSession, UserQuizState } from '../interface';
import { shuffleArray } from './helpers';

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

export function selectRandomQuestion(sessionId: string): void {
  const session = sessionStorage[sessionId] as QuizSession;  // Assuming sessionStorage is correctly typed
  if (!session) {
    console.error("Session not found for ID:", sessionId);
    return;
  }
  const userQuizState = session.userQuizState;

  if (!userQuizState.questions.find(q => !q.asked)) {
    shuffleArray(userQuizState.questions);
    userQuizState.questions.forEach(q => q.asked = false);
  }

  const nextUnasked = userQuizState.questions.find(q => !q.asked);
  if (nextUnasked) {
    nextUnasked.asked = true;
    userQuizState.currentQuestionIndex = userQuizState.questions.indexOf(nextUnasked);
  }
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

  if (userQuizState.currentQuestionIndex !== null) {
    return userQuizState.questions[userQuizState.currentQuestionIndex];
  }

  return null;  // Return null if currentQuestionIndex is somehow null here
}

export function processAnswer(userQuizState: UserQuizState, userAnswer: string) {
  if (userQuizState.currentQuestionIndex === null) {
    console.error("No current question selected for answering.");
    return;
  }

  const currentQuestion = userQuizState.questions[userQuizState.currentQuestionIndex];
  
  if (currentQuestion.answer === userAnswer) {
    userQuizState.completedQuestions++;
    userQuizState.results.push({
      question: currentQuestion.question,
      userAnswers: Array.from(currentQuestion.attemptedAnswers, item => item as string).concat(userAnswer),
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

/* export function selectRandomQuestion(userQuizState: UserQuizState): void {
  if (!userQuizState.questions.find(q => !q.asked)) {
    shuffleArray(userQuizState.questions);  // Re-shuffle if all questions have been asked
    userQuizState.questions.forEach(q => q.asked = false);  // Reset 'asked' status
  }

  const nextUnasked = userQuizState.questions.find(q => !q.asked);
  if (nextUnasked) {
    nextUnasked.asked = true;
    userQuizState.currentQuestionIndex = userQuizState.questions.indexOf(nextUnasked);
  }
} */