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
});

let ArticleModel = mongoose.model("Article", articleSchema, "articles");

// Get all articles
ArticleModel.getAll = () => {
  console.log("... ArticleModel.getAll() has run");
  const query = ArticleModel.find({});
  return query;
};
