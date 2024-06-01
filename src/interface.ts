//* ----- Quiz State -----

export interface quizState {
  totalQuestions: number,
  highestIndex: number,
  questionsSeen: number[],
  currentIndex: number
}

export interface runState {
  targetAnswers: number,
  userAnswers: number,
  userRight: number,
  userWrong: number
}

export interface sessionState {
  started: boolean,
  finished: boolean
}


//? ----- Obsolete? -----

// export interface Question {
//   id: number;
//   category: string;
//   difficulty: string;
//   question: string;
//   options: string[];
//   answer: string;
//   favourited: boolean;
//   timestamp: string;
// }

// export interface Quiz {
//   questions: Question[];
// }

// export interface QuizContent {
//   quiz: Quiz;
// }
