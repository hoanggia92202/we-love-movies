const service = require("./movies.service");

const list = async (req, res) => {
  res.json({ data: await service.list() });
};

const read = async (req, res) => {
  const { movieId } = req.params;
  res.json({ data: await service.read(movieId) });
};

module.exports = {
  list,
  read,
};
