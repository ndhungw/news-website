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
    const categories = await CategoryModel.getAllCategories();
    const latestArticles = await ArticleModel.getAllArticles().limit(5);
    const relatedArticles = await ArticleModel.getAllArticlesByCategoryTitle(category.title).limit(3);

    console.log(relatedArticles)
    if (article) {
      res.render("default/article", {
        title: article.title,
        article: article,
        category: category,
        categories: categories,
        latestArticles: latestArticles,
        relatedArticles: relatedArticles,
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
