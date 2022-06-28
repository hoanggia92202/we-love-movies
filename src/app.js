if (process.env.USER) require("dotenv").config();
const knex = require("./db/connection");
const express = require("express");
const app = express();

app.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;

  knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first()
    .then((data) => res.json({ data }));
});

app.get("/movies", (req, res) => {
  knex
    .from("movies")
    .select("*")
    .then((data) => res.json({ data }));
});



module.exports = app;
