import 'express-session';
import { UserQuizState } from './src/interface';

declare module 'express-session' {
  interface SessionData {
    userQuizState?: UserQuizState;
    quizState?: UserQuizState;
  }
}