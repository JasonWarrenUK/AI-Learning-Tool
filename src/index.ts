import express, { Express, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Only set secure to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

/* TEST
import express from 'express';
import session from 'express-session';
import './src/types/express-session';

const app = express();

app.use(session({
  secret: 'some_secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  req.session.userQuizState = {
		questions: {
			asked: false,
			attempts: 0,
			attemptedAnswers: "Test"
		},
		currentQuestionIndex: 1,
		completedQuestions: 0,
		results: {
			question: "What is the chemical symbol for Hydrogen?",
			attempts: 0
		}
	};
  console.log(req.session.userQuizState);  // Check if TypeScript throws an error here
  res.send('Test complete');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
}); */