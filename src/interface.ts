//* ----- User State -----

export interface _dev {
  devMode: boolean;
  modeName: string;
}

//* ----- Quiz State -----

export interface _source {
  totalQuestions: number;
  highestIndex: number;
  questionsSeen: number[];
  currentIndex: number;
}

export interface _progress {
  targetAnswers: number;
  userAnswers: number;
  userRight: number;
  userWrong: number;
}

export interface _session {
  started: boolean;
  finished: boolean;
  midquestion: boolean;
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
