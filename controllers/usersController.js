const ArticleModel = require("./../models/articleModel");

usersController = {};

usersController.showAllArticles = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showAllArticles");
    const articles = await ArticleModel.getAllArticles();
    res.render("pages/users/articles/articles", { articles: articles });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showAllArticles - " + e
    );
  }
};

usersController.showNewArticlePage = (req, res, next) => {
  try {
    console.log("... RUN - usersController.showNewArticlePage");
    res.render("pages/users/articles/new", { article: new ArticleModel() });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showNewArticlePage - " + e
    );
  }
};

usersController.getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.getArticle(req.params.slug);
    res.render("pages/users/articles/show", { article: article });
  } catch (e) {
    console.log("... Get error when run - usersController.getArticle - " + e);
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
    console.log("... RUN - usersController.addArticle");
    articleToAdd = await ArticleModel.addArticle(articleToAdd);
    res.redirect(`/users/articles/${articleToAdd.slug}`);
  } catch (e) {
    console.log(
      "... Get error when run - usersController.addArticle error - " + e
    );
    res.render("pages/users/articles/new", { article: articleToAdd });
  }
};

usersController.deleteArticle = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.deleteArticle");
    await ArticleModel.deleteArticle(req.params.id);
    res.redirect("/users/articles");
  } catch (e) {
    console.log(
      "... Get error when run - usersController.deleteArticle - " + e
    );
  }
};

module.exports = usersController;
