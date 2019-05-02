const router = require("express").Router();
const itemController = require("../../controllers/itemController");

router.route("/")
    // insert function from itemController that gets the items for the search
    .get(itemController.findNearby)
    
    // insert itemController function that posts a new item to the database
    // pass user id to link to user
router.route("/:id")
    .post(itemController.create)

router.route("/:id")
    // insert itemController function that will update an item in the database at that item id
    .put(itemController.update)

module.exports = router;