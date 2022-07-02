if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRouter = require("./movies/movies.router");
const app = express();

app.use("/movies", moviesRouter);

/** handle routes error **/
app.use((req, res, next) => {
  next({
    error: 404,
    message: "route not found.",
  });
});

/** handle all error **/
app.use((err, req, res, next) => {
  const { error = 500, message = "all error" } = err;
  res.json({ error, message });
});

module.exports = app;
