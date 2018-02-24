const router = require("express").Router();
const NYT = require('nyt');
// const booksController = require("../../controllers/searchController");
require('dotenv').config();

//nyt api key for query
var keys = {
  'article-search': process.env.nytApiKey
}

function requestNYT(params, callback) {

  //instantiate new NYT object
  const nyt = new NYT(keys);

  //FORMAT YYYYMMDD --> beginning/end of chosen year
  const beginDate = params.startYear + "0101"
  const endDate = params.endYear + "1231"
  
  //search NYT based on user criteria
  nyt.article.search({
    'query': params.queryText,
    'begin_date': beginDate,
    'end_date': endDate,
    'sort': 'newest',
    'fl': 'web_url, snippet, headline, multimedia, _id',
    'page': 0
  }, (searchResults) => callback(searchResults));
}

router.post("/", (req, res) => {
  //passing in the search params to the nyt search function
  //wait for search to callback before sending res to client
  requestNYT(req.body, (searchResults) => {
    res.json(searchResults);
  });
})

module.exports = router;