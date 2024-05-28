import { Request, Response, NextFunction } from 'express';

export function index(req: Request, res: Response, next: NextFunction) {
	let htmlResponse: string = ``;
	htmlResponse += `<h1>QUIZ?</h1>`;
	htmlResponse += `<br/>`;
	htmlResponse += `<p><a href="/quiz/random/1">Quiz</a></p>`;

	res.send(htmlResponse);
}

export function debug(req: Request, res: Response, next: NextFunction) {
	let htmlResponse: string = ``;
	htmlResponse += `<h1>Server Routes</h1>
		<br/>
		<h2>Test Routes</h2>
		<ul>
			<li><a href="/test/hello">Hello Message</a></li>
			<li><a href="/test/json">JSON</a></li>
			<li><a href="/test/data">Questions from JSON</a></li>
			<li><a href="/test/1">Question 1</a></li>
			<li><a href="/test/30">Question 30</a></li>
		</ul>
		<br/>
		<h2>Quiz Routes</h2>
	`;

	res.send(htmlResponse);
}