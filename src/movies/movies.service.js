const knex = require("../db/connection");

/** return all movies **/
const list = () => {
  return knex("movies").select("*");
};

/** return only movies with status is_showing === true **/
const isShowing = () => {
  return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .distinct("movies.movie_id", "movies.*")
    .where({ is_showing: true });
};

/** return a movies by ID **/
const read = (movieId) => {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
};

/** return all theaters showing a movie by ID **/
const readTheaters = (movieId) => {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .select("*")
    .where("movies_theaters.movie_id", movieId);
};

/** return all reviews by movie ID **/
const readReviews = (movieId) => {
  return knex("movies")
    .join("reviews", "movies.movie_id", "reviews.movie_id")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.*","critics.*")
    .where("reviews.movie_id", movieId);
};

module.exports = {
  list,
  isShowing,
  read,
  readTheaters,
  readReviews,
};
