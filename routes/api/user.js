const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .post(userController.newUser);

router.route("/:email").get(userController.signIn);

module.exports = router;
