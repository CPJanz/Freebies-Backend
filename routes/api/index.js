const router = require("express").Router();

const userRoutes = require("./user");
const itemRoutes = require("./item");

router.use("/user", userRoutes);
router.use("/item", itemRoutes);

module.exports = router;
