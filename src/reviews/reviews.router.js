const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../middleware/methodNotAllowed");

router
  .route("/:reviewId")
  .put(controller.reviewUpdate)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
