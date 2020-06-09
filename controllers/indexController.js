const ArticleModel = require("./../models/articleModel");
const CategoryModel = require("./../models/categoryModel");

indexController = {};

indexController.showHomePage = async (req, res) => {
  try {
    console.log("... RUN - indexController.showHomePage");
    const categories = await CategoryModel.getAllCategories();
    let categoriesWithCorrespondingArticles = [];

    for (let i = 0; i < categories.length; i++) {
      const articles = await ArticleModel.getAllArticlesByCategory(
        categories[i].title
      ).limit(5);
      const latestArticle = articles[0];
      let rightArticleList = [];

      for (let j = 1; j < articles.length; j++) {
        rightArticleList[j - 1] = articles[j];
      }

      categoriesWithCorrespondingArticles[i] = {
        category: categories[i],
        latestArticle: latestArticle,
        rightArticleList: rightArticleList,
      };
    }

    console.log(categoriesWithCorrespondingArticles);

    res.render("default/index", {
      title: "Trang chủ",
      categoriesWithCorrespondingArticles: categoriesWithCorrespondingArticles,
    });

    // if (categories != null && articles != null) {
    //   res.render("default/index", {
    //     title: "Trang chủ",
    //     categoriesWithCorrespondingArticles: categoriesWithCorrespondingArticles,
    //   });
    // } else {
    //   if (!categories) {
    //     console.log("categories is null");
    //   }
    //   if (!articles) {
    //     console.log("articles is null");
    //   }
    // }
  } catch (e) {
    console.log("... Get error when run - indexController.showHomePage - " + e);
  }
};

indexController.showContactPage = async (req, res) => {
  res.render("default/contact", { title: "Liên hệ" });
};

module.exports = indexController;
