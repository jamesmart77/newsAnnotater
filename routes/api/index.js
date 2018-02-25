const router = require("express").Router();
const searchRoute = require("./search");
const articleRoute = require("./article");

// Book routes
router.use("/search", searchRoute);
router.use("/article", articleRoute);

module.exports = router;
