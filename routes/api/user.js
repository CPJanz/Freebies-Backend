const router = require("express").Router();
const userController = require("../../controllers/userController");

// route to post a new user to the database on signup; needs to call new user function from userController
router.route("/")
    .get(userController.allUsers)
    .post(userController.newUser);

// route to get the necessary information from the user collection by passing the user id; this will be for sign in
router.route(":id")
    .get(userController.signIn);

// route to user that will populate with their posted items based on user id
router.route("/posts/:id")
    .get(userController.postedList);

module.exports = router;