/* ----- IMPORTS ----- */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";


/* ----- SETUP ----- */

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


/* ----- ROUTES ----- */

app.get("/", (req: Request, res: Response) => {
  res.send("Help, I am trapped inside this server");
});


/* ----- APP ----- */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});