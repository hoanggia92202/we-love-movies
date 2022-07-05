const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

const read = async (req, res) => {
  const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
  });

  const result = await service.read();

  console.log(JSON.stringify(reduceMovies(result), null, 4));
  //console.log("read >>>>>>", result);
  res.json({ data: reduceMovies(result) });
};

module.exports = {
  read,
};
