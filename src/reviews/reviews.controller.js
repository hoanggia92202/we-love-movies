const service = require("./reviews.service");

/** routes middleware **/
const hasCorrectId = async (req, res, next) => {
  const { reviewId } = req.params;
  const reviewExist = await service.read(reviewId);
  if (reviewExist) {
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
};

/** routes handler **/
/** update a review by ID **/
const reviewUpdate = async (req, res) => {
  const { reviewId } = req.params;
  const data = {
    reviewId: reviewId,
    body: req.body,
  };
  const updateSuccess = await service.update(data);
  if (updateSuccess) {
    const updatedReview = await service.readReviewAndCritic(reviewId);
    const {
      critic_id,
      preferred_name,
      surname,
      organization_name,
      review_id,
      content,
      score,
      movie_id,
      created_at,
      updated_at,
    } = updatedReview[0];
    const result = {
      review_id,
      content,
      score,
      movie_id,
      created_at,
      updated_at,
      critic_id,
      critic: { critic_id, organization_name, preferred_name, surname },
    };
    res.json({ data: result });
  }
};

/** delete a review by ID **/
const destroy = async (req, res) => {
  const { reviewId } = req.params;
  await service.delete(reviewId);
  res.sendStatus(204);
};

module.exports = {
  reviewUpdate: [hasCorrectId, reviewUpdate],
  delete: [hasCorrectId, destroy],
};
