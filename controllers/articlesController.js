const ArticleModel = require("../models/articleModel");
articlesController = {};

articlesController.showSingleArticle = async (req, res) => {
  try {
    console.log("... RUN - articlesController.showSingleArticle");
    const article = await ArticleModel.getArticle(req.params.slug);
    if (article.title) {
      //console.log("khong null");
      res.render("default/single-page", { article: article });
    }
  } catch (e) {
    console.log(
      "... Get error when run - articlesController.showSingleArticle - " + e
    );
    res.redirect("/");
  }
};

module.exports = articlesController;
