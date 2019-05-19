const router = require("express").Router();
const itemController = require("../../controllers/itemController");

router.route("/").get(itemController.findNearby);

router
  .route("/:id")
  .post(itemController.create)
  .put(itemController.updateAvailable)
  .get(itemController.findGiven)
  .delete(itemController.removeItem);

router.route("/repost/:id").put(itemController.repost);

module.exports = router;
