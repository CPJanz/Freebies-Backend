const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
  .post(userController.newUser);

router.route("/:email")
  .get(userController.signIn);

router.route("/:id")
  .delete(userController.removeAcct);

module.exports = router;
