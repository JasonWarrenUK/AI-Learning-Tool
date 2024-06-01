import { Request, Response, NextFunction } from 'express';
import * as dev from "./cDev";

//* ----- Content Builder -----

export function index(req: Request, res: Response, next: NextFunction) {
	let htmlResponse: string = ``

	htmlResponse += dev.modeOpts(req,res);

	htmlResponse += `<hr/`;

	htmlResponse += `<h1>YIS?</h1>
	<h2>User Quiz Routes</h2>

	<ul>
		<li><a href="/quiz/">Quiz</a></li>
	</ul>
	
	<h2>Dev Quiz Routes</h2>

	<ul>
		<li><a href="/quiz/random">Get Question (Default)</a></li>
		<li><a href="/quiz/random/1">Get Question (1)</a></li>
		<li><a href="/quiz/random/5">Get Question (5)</a></li>
		<li><a href="/quiz/random/10">Get Question (10)</a></li>
		<li><a href="/quiz/check">Check Answer</a></li>
	</ul>

	<h2>Debug Routes</h2>

	<ul>
		<li><a href="/test/runAll">Run All Questions</a></li>
		<li><a href="/quiz/reset">Reset Run State</a></li>
		<li><a href="/quiz/state">Console Log Run State</a></li>
	</ul>`;

	htmlResponse += `<hr/`;

	res.send(htmlResponse);
}