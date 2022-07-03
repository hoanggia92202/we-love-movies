const service = require("./movies.service");

const list = async (req, res) => {
  const { is_showing } = req.query;

  if (is_showing === "true") {
    const result = await service.isShowing();
    res.json({ data: result.splice(30) });
  } else {
    res.json({ data: await service.list() });
  }
};

const read = async (req, res) => {
  const { movieId } = req.params;
  res.json({ data: await service.read(movieId) });
};

module.exports = {
  list,
  read,
};
