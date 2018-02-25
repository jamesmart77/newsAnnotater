import axios from "axios";

export default {

  //call news api based on search criteria
  searchNews: (searchParams) => axios.post("/api/search", searchParams),
  
  //call news api based on search criteria
  getSavedArticles: () => axios.get("/api/article"),

  //save new article
  saveArticle: (articleParams) => axios.post("/api/article", articleParams),
  
  //save new article
  deleteArticle: (articleId) => axios.delete("/api/article/" + articleId)
};
