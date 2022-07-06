const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../middleware/methodNotAllowed");

router.route("/").get(controller.read).all(methodNotAllowed);

module.exports = router;
