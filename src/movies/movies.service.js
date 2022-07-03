const knex = require("../db/connection");

/** get all movies **/
const list = () => {
  return knex("movies").select("*");
};

/** get only movies with status is_showing === true **/
const isShowing = () => {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where({ is_showing: true });
};

/** get a movies by ID **/
const read = (movieId) => {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
};

module.exports = {
  list,
  isShowing,
  read,
};
