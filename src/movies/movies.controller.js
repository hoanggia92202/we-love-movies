const service = require("./movies.service");

/** routes middleware **/

const hasCorrectId = async (req,res,next) => {
  const { movieId } = req.params;
  const movieExist = await service.read(movieId)
  if(movieExist){
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found."
  })
}

/** routes handler **/

const list = async (req, res) => {
  const { is_showing } = req.query;
  /** resolve only movies that is currently showing **/
  if (is_showing === "true") {
    res.json({ data: (await service.isShowing()).splice(30) });
  } else {
    /** resolve all movies **/
    res.json({ data: await service.list() });
  }
};

/** resolve a movie **/
const readMovie = async (req, res) => {
  const { movieId } = req.params;
  res.json({ data: await service.read(movieId) });
};

/** resolve all theaters showing a movie by ID **/
const readTheaters = async (req, res) => {
  const { movieId } = req.params;
  res.json({ data: await service.readTheaters(movieId) });
};

/** resolve all reviews by movie ID **/
const readReviews = async (req, res) => {
  const { movieId } = req.params;
  const reviews = await service.readReviews(movieId);

  const updatedReview = reviews.map((review) => {
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
    } = review;
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
    return result;
  });
  res.json({ data: updatedReview });
};

module.exports = {
  list,
  readMovie: [hasCorrectId, readMovie],
  readTheaters,
  readReviews,
};
