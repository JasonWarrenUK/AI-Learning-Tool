import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Welcome to Knowledge Kata. Proceed to http://localhost:${port}`);
});