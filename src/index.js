const express = require("express");
const dotenv = require("dotenv");

// pass config from .env to process.env
dotenv.config();

// Create an Express app
const app = express();

// Get PORT from .env
const port = process.env.PORT || 3000;

/* ----- ROUTES ----- */

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

/* ----- APP ----- */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});