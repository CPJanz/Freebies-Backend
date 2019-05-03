const router = require("express").Router();
const itemController = require("../../controllers/itemController");

router.route("/").get(itemController.findNearby);

router
  .route("/:id")
  .post(itemController.create)
  .put(itemController.taken)
  .get(itemController.findGiven);

router.route("/repost/:id").put(itemController.repost);

module.exports = router;
