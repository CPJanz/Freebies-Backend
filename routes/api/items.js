const router = require("express").Router();
const itemController = require("../../controllers/itemController");

router.route("/")
    // insert function from itemController that gets the items for the search
    .get()
    // insert itemController function that posts a new item to the database
    .post()

router.route("/:id")
    // insert itemController function that will update an item in the database at that item id
    .update()

module.exports = router;