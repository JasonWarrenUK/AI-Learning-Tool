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
