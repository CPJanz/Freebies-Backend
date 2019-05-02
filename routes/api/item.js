const router = require("express").Router();
const itemController = require("../../controllers/itemController");

router.route("/")
    .get(itemController.findNearby)

router.route("/:id")
    .post(itemController.create)
    .put(itemController.update)

module.exports = router;