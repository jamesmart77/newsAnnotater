const router = require("express").Router();
const searchRoute = require("./search");

// Book routes
router.use("/search", searchRoute);

module.exports = router;
