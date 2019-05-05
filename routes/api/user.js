const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.allUsers)
  .post(userController.newUser);

router.route("/:email").get(userController.signIn);

module.exports = router;
