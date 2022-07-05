const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

const read = async (req, res) => {
  /** This function is used to put all the movies **/
  /** that belong to a single theater in an array **/
  const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
  });
  const data = await service.read();
  res.json({ data: reduceMovies(data) });
};

module.exports = {
  read,
};
