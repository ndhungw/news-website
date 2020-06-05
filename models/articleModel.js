// import mongoose
const mongoose = require("mongoose");

// use the mongoose schema object
let Schema = mongoose.Schema;

// create Schema
let articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

let ArticleModel = mongoose.model("Article", articleSchema, "articles");

// Get all articles
ArticleModel.getAllArticles = () => {
  console.log("... ArticleModel.getAll() has run");
  const query = ArticleModel.find().sort({
    createdAt: "desc",
  });

  return query;
};

ArticleModel.addArticle = (articleToAdd) => {
  console.log("... ArticleModel.addArticle has run");
  return articleToAdd.save();
};

ArticleModel.getArticle = (articleId) => {
  console.log("... ArticleModel.getArticle has run");
  const query = ArticleModel.findById(articleId);
  return query;
};

module.exports = ArticleModel;
