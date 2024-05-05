export interface Question {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
  favourited: boolean;
  timestamp: string;
}

export interface Quiz {
  questions: Question[];
}

export interface QuizContent {
  quiz: Quiz;
}

interface QuestionState extends Question {
  asked: boolean;
  attempts: number;
  attemptedAnswers: Set<string>;
}

interface UserQuizState {
  questions: QuestionState[];
  currentQuestionIndex: number | null;
  completedQuestions: number;
  results: { question: string; userAnswers: string[]; attempts: number }[];
}

export interface QuizSession {
  userQuizState: UserQuizState;
  sessionId: string;  // Ideally, a UUID generated for each session
}