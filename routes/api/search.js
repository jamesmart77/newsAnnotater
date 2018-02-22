const router = require("express").Router();
// const booksController = require("../../controllers/searchController");
require('dotenv').config();

//nyt api key for query
const apiKey = process.env.nytApiKey;

// Matches with "/api/search"
router.route("/")
  .get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': apiKey,
      'q': "trump",
      'begin_date': "20180101",
      'end_date': "20181231"
    },
  }, (err, res, body) => {

    console.log("HITTING IT IN THE SEARCH!\n")
    if (err) {
        console.log("ERROR OCCURRED")
        console.log(err);
        res.status(404).json({msg: "error occurred", err: err})
    }
    body = JSON.parse(body);
    console.log(body);

    res.json(body)
  });

module.exports = router;
