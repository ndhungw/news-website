const mongoose = require("mongoose"); // import mongoose
let Schema = mongoose.Schema; // use the mongoose schema object
const marked = require("marked");
const slugify = require("slugify");

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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

articleSchema.pre("validate", function (next) {
  // create slug from title
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  next();
});

let ArticleModel = mongoose.model("Article", articleSchema, "articles");

// Get all articles
ArticleModel.getAllArticles = () => {
  console.log("... RUN - ArticleModel.getAll()");
  const query = ArticleModel.find().sort({
    createdAt: "desc",
  });

  return query;
};

ArticleModel.addArticle = (articleToAdd) => {
  console.log("... RUN - ArticleModel.addArticle");
  return articleToAdd.save();
};

ArticleModel.getArticle = (articleSlug) => {
  console.log("... RUN - ArticleModel.getArticle");
  const query = ArticleModel.findOne({ slug: articleSlug });
  return query;
};

ArticleModel.deleteArticle = (articleId) => {
  console.log("... RUN - ArticleModel.deleteArticle");
  return ArticleModel.findByIdAndDelete(articleId);
};

module.exports = ArticleModel;
