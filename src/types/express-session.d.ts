import 'express-session';
import { UserQuizState } from './src/interface';

declare module 'express-session' {
  export interface SessionData {
    userQuizState?: UserQuizState;
    quizState?: UserQuizState;
  }
}