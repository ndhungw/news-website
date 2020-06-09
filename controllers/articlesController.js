const ArticleModel = require("../models/articleModel");
const CategoryModel = require("../models/categoryModel");

articlesController = {};

articlesController.showSingleArticlePage = async (req, res) => {
  try {
    console.log("... RUN - articlesController.showSingleArticle");
    const article = await ArticleModel.getArticle(req.params.slug);
    const category = await CategoryModel.getCategoryByCategoryTitle(
      article.category
    );

    if (article) {
      res.render("default/article", {
        article: article,
        category: category,
      });
    }
  } catch (e) {
    console.log(
      "... Get error when run - articlesController.showSingleArticle - " + e
    );
    res.redirect("/");
  }
};

module.exports = articlesController;
