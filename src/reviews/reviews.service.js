const knex = require("../db/connection");

/** join Reviews and Critics table **/
const readReviewAndCritic = (reviewId) => {
  return knex("critics")
    .join("reviews", "critics.critic_id", "reviews.critic_id")
    .select("reviews.*", "critics.*")
    .where("reviews.review_id", reviewId);
};

/** read a review by ID **/
const read = (reviewId) => {
  return knex("reviews").where("reviews.review_id", reviewId).first();
};

/** update a review by ID **/
const update = (data) => {
  return knex("reviews")
    .where("reviews.review_id", data.reviewId)
    .update({
      score: data.body.score,
      content: data.body.content === undefined ? "Content" : data.body.content,
    });
};

/** delete a review by ID **/
const destroy = (reviewId) => {
  return knex("reviews").where("reviews.review_id", reviewId).del();
};

module.exports = {
  read,
  readReviewAndCritic,
  update,
  delete: destroy,
};
