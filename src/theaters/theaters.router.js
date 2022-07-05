const router = require("express").Router();
const controller = require("./theaters.controller");

router.route("/").get(controller.read);

module.exports = router;
