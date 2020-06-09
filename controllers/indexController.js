const ArticleModel = require("./../models/articleModel");
const CategoryModel = require("./../models/categoryModel");

indexController = {};

indexController.showHomePage = async (req, res) => {
  try {
    console.log("... RUN - indexController.showHomePage");
    const categories = await CategoryModel.getAllCategories();

    // build an array about each category contains it's articles
    let categoriesWithCorrespondingArticles = [];

    for (let i = 0; i < categories.length; i++) {
      const articles = await ArticleModel.getAllArticlesByCategoryTitle(
        categories[i].title
      ).limit(5); // only get 5 articles to show
      const latestArticle = articles[0]; // the first will be the latest cuz we had used find with sort desc
      let rightArticleList = []; // articles to show on the right

      for (let j = 1; j < articles.length; j++) {
        rightArticleList[j - 1] = articles[j];
      }

      categoriesWithCorrespondingArticles[i] = {
        category: categories[i],
        latestArticle: latestArticle,
        rightArticleList: rightArticleList,
      };
    }

    res.render("default/index", {
      title: "Trang chủ",
      categoriesWithCorrespondingArticles: categoriesWithCorrespondingArticles,
    });
  } catch (e) {
    console.log("... Get error when run - indexController.showHomePage - " + e);

    if (!categories) {
      console.log("categories is null");
    }
    if (!articles) {
      console.log("articles is null");
    }
  }
};

indexController.showContactPage = async (req, res) => {
  res.render("default/contact", { title: "Liên hệ" });
};

module.exports = indexController;
