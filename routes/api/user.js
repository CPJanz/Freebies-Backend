const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.allUsers)
  .post(userController.newUser);

router.route("/:email").get(userController.signIn);

router.route("/posts/:id").get(userController.postedList);

module.exports = router;
