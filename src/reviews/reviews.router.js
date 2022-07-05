const router = require("express").Router();
const controller = require("./reviews.controller");

//router.route("/").get(controller.list);
router
  .route("/:reviewId")
  .put(controller.reviewUpdate)
  .delete(controller.delete);

module.exports = router;
