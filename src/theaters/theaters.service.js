const knex = require("../db/connection");

const read = () => {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select("theaters.*", "movies.*")
    .groupBy("theaters.theater_id", "movies.movie_id");
};

module.exports = {
  read,
};
