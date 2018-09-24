import axios from "axios";
import apikey from "./apikey";
import request from "request"

export default {
  getArticles: function() {
    return axios.get("/api/articles");
  },
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  searchNYT: function(search, date) {
    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': process.env.APIKEY || apikey,
        'q': search,
        // 'end_date': date || Date.now()
      },
    }, function(err, response, body) {
      body = JSON.parse(body)
      console.log(body)
      console.log(body.docs)
      const articleData = body.docs.map(article => ({
        title: article.snippet,
        summary: article.lead_paragraph,
        date: article.pub_date
      }));
    })
  }
};
