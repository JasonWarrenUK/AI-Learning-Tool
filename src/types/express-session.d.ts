import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userQuizState?: UserQuizState;
    quizState?: UserQuizState;
  }
}