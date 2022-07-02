const knex = require("../db/connection");

/** get all movies **/
const list = () => {
  return knex("movies").select("*");
};

/** get a movies by ID **/
const read = (movieId) => {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
};

module.exports = {
  list,
  read,
};
