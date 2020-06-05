const ArticleModel = require("./../models/articleModel");

usersController = {};

usersController.showAllArticles = async (req, res, next) => {
  try {
    console.log("... usersController.showAllArticles has run");
    const articles = await ArticleModel.getAllArticles();
    res.render("pages/users/articles/articles", { articles: articles });
  } catch (e) {
    console.log("... usersController.showAllArticles error - " + e);
  }
};

usersController.showNewArticlePage = (req, res, next) => {
  try {
    console.log("... usersController.showNewArticlePage has run");
    res.render("pages/users/articles/new", { article: new ArticleModel() });
  } catch (e) {
    console.log("... usersController.showNewArticlePage error - " + e);
  }
};

usersController.getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.getArticle(req.params.id);
    res.render("pages/users/articles/show", { article: article });
  } catch (e) {
    console.log("... Get error when run usersController.getArticle - " + e);
    res.redirect("/users/articles");
  }
};

usersController.addArticle = async (req, res, next) => {
  let articleToAdd = new ArticleModel({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    console.log("... usersController.addArticle has run");
    articleToAdd = await ArticleModel.addArticle(articleToAdd);
    res.redirect(`/users/articles/${articleToAdd.id}`);
  } catch (e) {
    console.log("... usersController.addArticle error - " + e);
    res.render("pages/users/articles/new", { article: articleToAdd });
  }
};

module.exports = usersController;
