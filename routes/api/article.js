const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with "/api/article"
router
  .route("/")
  .post(articleController.create)
  .get(articleController.findAll)

// Matches with "/api/article/:id"
router
  .route("/:id")
  .delete(articleController.remove);

module.exports = router;
