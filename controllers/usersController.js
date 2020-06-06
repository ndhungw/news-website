const ArticleModel = require("./../models/articleModel");

usersController = {};

/* Manage articles */

usersController.showAllArticles = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showAllArticles");
    const articles = await ArticleModel.getAllArticles();
    res.render("users/articles/articles", { articles: articles });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showAllArticles - " + e
    );
  }
};

usersController.showNewArticlePage = (req, res, next) => {
  try {
    console.log("... RUN - usersController.showNewArticlePage");
    res.render("users/articles/new", { article: new ArticleModel() });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showNewArticlePage - " + e
    );
  }
};

usersController.getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.getArticle(req.params.slug);
    res.render("users/articles/show", { article: article });
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
    console.log("... Get error when run - usersController.addArticle - " + e);
    res.render("users/articles/new", { article: articleToAdd });
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

usersController.showEditArticlePage = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showEditArticlePage");
    let articleToEdit = await ArticleModel.getArticleById(req.params.id);
    res.render("users/articles/edit", { article: articleToEdit });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showEditArticlePage - " + e
    );
  }
};

usersController.editArticle = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.editArticle");
    let articleToEdit = await ArticleModel.getArticleById(req.params.id);
    articleToEdit.title = req.body.title;
    articleToEdit.description = req.body.description;
    articleToEdit.markdown = req.body.markdown;
    await articleToEdit.save();
    res.redirect(`/users/articles/${articleToEdit.slug}`);
  } catch (e) {
    console.log("... Get error when run - usersController.editArticle - " + e);
    res.render("users/articles/edit", { article: articleToEdit });
  }
};

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.description = req.body.description;

    try {
      console.log("... RUN - saveArticleAndRedirect");
      article = await article.save();
      res.redirect(`/users/articles/${article.slug}`);
    } catch (e) {
      console.log("... Get error when run - saveArticleAndRedirect - " + e);
      res.render(`users/articles/${path}`, { article: article });
    }
  };
}

// usersController.saveArticleAndRedirect = function (path) {
//   return async (req, res) => {
//     let article = req.article;
//     article.title = req.body.title;
//     article.description = req.body.description;
//     article.description = req.body.description;

//     try {
//       console.log("... RUN - saveArticleAndRedirect");
//       article = await article.save();
//       res.redirect(`/users/articles/${article.slug}`);
//     } catch (e) {
//       console.log("... Get error when run - saveArticleAndRedirect - " + e);
//       res.render(`pages/users/articles/${path}`, { article: article });
//     }
//   };
// };

/* Manage categories */
usersController.showAllCategories = async (req, res) => {
  // res.send("show all categories in admin panel");
  res.render("users/categories/categories");
};

module.exports = usersController;
