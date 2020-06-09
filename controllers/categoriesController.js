const ArticleModel = require("../models/articleModel");
const CategoryModel = require("../models/categoryModel");

categoriesController = {};

categoriesController.showCategoryPage = async (req, res) => {
  try {
    console.log("... RUN - categoriesController.showCategoryPage");
    const category = await CategoryModel.getCategoryByCategorySlug(
      req.params.categorySlug
    );
    const articles = await ArticleModel.getAllArticlesByCategoryTitle(
      category.title
    );

    console.log(req.params.categorySlug);
    console.log("category:\n" + category);
    console.log("articles:\n" + articles);

    if (articles) {
      res.render("default/category", {
        category: category,
        articles: articles,
      });
    }
  } catch (e) {
    console.log(
      "... Get error when run - categoriesController.showCategoryPage - " + e
    );
    res.redirect("/");
  }
};

module.exports = categoriesController;
